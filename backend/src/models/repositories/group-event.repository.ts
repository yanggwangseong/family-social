import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { IUpdateGroupEventArgs } from '@/types/args/group-event';
import { OverrideInsertFeild } from '@/types/repository';

import { GroupEventItemResDto } from '../dto/group-event/res/group-event-item-res.dto';
import { GroupEventEntity } from '../entities/group-event.entity';

@Injectable()
export class GroupEventRepository extends Repository<GroupEventEntity> {
	constructor(
		@InjectRepository(GroupEventEntity)
		private readonly repository: Repository<GroupEventEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<GroupEventEntity>(GroupEventEntity)
			: this.repository;
	}

	async getGroupEventByGroupEventId(
		groupEventId: string,
	): Promise<GroupEventItemResDto> {
		return this.repository.findOneOrFail({
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
				id: groupEventId,
			},
			relations: {
				eventGroup: true,
				eventOrganizer: true,
			},
			order: {
				eventStartDate: 'ASC',
			},
		});
	}

	async createGroupEvent(
		overrideInsertFeilds: OverrideInsertFeild<GroupEventEntity>,
		qr?: QueryRunner,
	) {
		const repository = this.getRepository(qr);

		await repository.insert(overrideInsertFeilds);
	}

	async updateGroupEvent(
		{ groupEventId, ...rest }: IUpdateGroupEventArgs,
		qr?: QueryRunner,
	) {
		const repository = this.getRepository(qr);

		await repository.update({ id: groupEventId }, { ...rest });
	}

	async deleteGroupEvent(groupEventId: string, qr?: QueryRunner) {
		const repository = this.getRepository(qr);

		const { affected } = await repository.delete({
			id: groupEventId,
		});

		return !!affected;
	}
}
