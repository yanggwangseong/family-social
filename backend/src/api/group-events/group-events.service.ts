import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { Pagination } from '@/common/strategies/context/pagination';
import {
	ERROR_DELETE_GROUP_EVENT,
	ERROR_GROUP_EVENT_TYPE_NOT_FOUND,
} from '@/constants/business-error';
import { GroupEventPaginationReqDto } from '@/models/dto/group-event/req/group-event-pagination-req.dto';
import { GroupEventItemResDto } from '@/models/dto/group-event/res/group-event-item-res.dto';
import { GroupEventEntity } from '@/models/entities/group-event.entity';
import { GroupEventTypeRepository } from '@/models/repositories/group-event-type.repository';
import { GroupEventRepository } from '@/models/repositories/group-event.repository';
import { EventType, Union } from '@/types';
import {
	ICreateGroupEventArgs,
	IUpdateGroupEventArgs,
} from '@/types/args/group-event';
import { BasicPaginationResponse } from '@/types/pagination';
import { getOffset } from '@/utils/getOffset';

@Injectable()
export class GroupEventsService {
	constructor(
		private readonly groupEventRepository: GroupEventRepository,
		private readonly groupEventTypeRepository: GroupEventTypeRepository,
	) {}

	async findAllGroupEvent(
		pagination: Pagination<GroupEventEntity>,
		paginationDto: GroupEventPaginationReqDto,
		eventGroupId: string,
	): Promise<BasicPaginationResponse<GroupEventItemResDto>> {
		const { page, limit } = paginationDto;
		const { take, skip } = getOffset({ page, limit });

		const { list, count }: { list: GroupEventItemResDto[]; count: number } =
			await pagination.paginate(paginationDto, this.groupEventRepository, {
				select: {
					id: true,
					eventType: true,
					eventCoverImage: true,
					eventName: true,
					eventDescription: true,
					eventStartDate: true,
					eventStartTime: true,
					eventEndDate: true,
					eventEndTime: true,
					eventGroupId: true,
					eventOrganizerId: true,
					createdAt: true,
					eventGroup: {
						id: true,
						groupName: true,
						groupDescription: true,
						groupCoverImage: true,
					},
					eventOrganizer: {
						id: true,
						username: true,
						profileImage: true,
						email: true,
					},
				},
				where: {
					eventGroupId,
				},
				relations: {
					eventGroup: true,
					eventOrganizer: true,
				},
				skip,
				take,
			});

		return {
			list,
			page,
			count,
			take,
		};
	}

	async findOneGroupEvent(groupEventId: string) {
		const result = await this.groupEventRepository.getGroupEventByGroupEventId(
			groupEventId,
		);

		return result;
	}

	async createGroupEvent(
		createGroupEventArgs: ICreateGroupEventArgs,
		qr?: QueryRunner,
	) {
		const { eventType } = createGroupEventArgs;

		if (!this.isEventTypeExists(eventType))
			throw EntityNotFoundException(ERROR_GROUP_EVENT_TYPE_NOT_FOUND);

		const newGroupEvent = this.groupEventRepository.create({
			id: uuidv4(),
			...createGroupEventArgs,
		});

		await this.groupEventRepository.createGroupEvent(newGroupEvent, qr);
	}

	async updateGroupEventByGroupEventId(
		updateGroupEventArgs: IUpdateGroupEventArgs,
		qr?: QueryRunner,
	) {
		await this.groupEventRepository.updateGroupEvent(updateGroupEventArgs, qr);
	}

	async deleteGroupEventByGroupEventId(groupEventId: string, qr?: QueryRunner) {
		const status = await this.groupEventRepository.deleteGroupEvent(
			groupEventId,
			qr,
		);

		if (!status) throw EntityConflictException(ERROR_DELETE_GROUP_EVENT);
	}

	async groupEventExistsByGroupEventId(groupEventId: string) {
		return await this.groupEventRepository.exist({
			where: {
				id: groupEventId,
			},
		});
	}

	async isMineGroupEventExists(
		groupEventId: string,
		memberId: string,
	): Promise<boolean> {
		return await this.groupEventRepository.exist({
			where: {
				id: groupEventId,
				eventOrganizerId: memberId,
			},
		});
	}

	private async isEventTypeExists(
		eventType: Union<typeof EventType>,
	): Promise<boolean> {
		return await this.groupEventTypeRepository.exist({
			where: {
				groupEventType: eventType,
			},
		});
	}
}
