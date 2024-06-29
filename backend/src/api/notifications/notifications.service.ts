import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, QueryRunner } from 'typeorm';

import { Pagination } from '@/common/strategies/context/pagination';
import { NotificationPaginationReqDto } from '@/models/dto/notification/req/notification-pagination-req.dto';
import { NotificationResDto } from '@/models/dto/notification/res/notification.res.dto';
import { NotificationEntity } from '@/models/entities/notification.entity';
import { NotificationTypeRepository } from '@/models/repositories/notification-type.repository';
import { NotificationsRepository } from '@/models/repositories/notifications.repository';
import { AlarmType, Union } from '@/types';
import { ICreateNotificationArgs } from '@/types/args/notification';
import { BasicPaginationResponse } from '@/types/pagination';
import { getOffset } from '@/utils/getOffset';

import { ServerSentEventsService } from '../server-sent-events/server-sent-events.service';

@Injectable()
export class NotificationsService {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
		private readonly notificationTypeRepository: NotificationTypeRepository,
		private readonly serverSentEventsService: ServerSentEventsService,
	) {}

	async getNotificationByMemberId(
		memberId: string,
		paginationDto: NotificationPaginationReqDto,
		pagination: Pagination<NotificationEntity>,
	): Promise<BasicPaginationResponse<NotificationResDto>> {
		const { page, limit, is_read_options } = paginationDto;
		const { take, skip } = getOffset({ page, limit });

		const whereOverride: FindOptionsWhere<NotificationEntity> = {
			recipientId: memberId,
		};

		if (is_read_options === 'READ') {
			whereOverride.isRead = true;
		}

		if (is_read_options === 'NOTREAD') {
			whereOverride.isRead = false;
		}

		const { list, count }: { list: NotificationResDto[]; count: number } =
			await pagination.paginate(paginationDto, this.notificationsRepository, {
				select: {
					id: true,
					notificationTypeId: true,
					recipientId: true,
					senderId: true,
					notificationTitle: true,
					notificationDescription: true,
					notificationFeedId: true,
					isRead: true,
					createdAt: true,
					sender: {
						id: true,
						username: true,
						profileImage: true,
					},
				},
				where: {
					...whereOverride,
				},
				relations: {
					sender: true,
				},
				skip,
				take,
			});

		// const [list, count] = await this.notificationsRepository.getNotifications({
		// 	whereOverride,
		// 	take,
		// 	skip,
		// });

		return {
			list,
			page,
			count,
			take,
		};
	}

	async createNotification(
		notificationArgs: ICreateNotificationArgs,
		qr?: QueryRunner,
	) {
		const { notificationType, ...rest } = notificationArgs;

		const notificationTypeId = await this.findNotificationIdByNotificationType(
			notificationType,
		);

		await this.notificationsRepository.createNotification(
			{
				notificationTypeId,
				...rest,
			},
			qr,
		);

		this.serverSentEventsService.emitNotificationChangeEvent(rest.recipientId);
	}

	async findNotificationIdByNotificationType(
		notificationType: Union<typeof AlarmType>,
	) {
		const { notificationTypeId } =
			await this.notificationTypeRepository.findNotificationTypeId(
				notificationType,
			);

		return notificationTypeId;
	}
}
