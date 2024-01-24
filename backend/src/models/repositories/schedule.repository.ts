import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ICreateScheduleArgs } from '@/types/args/schedule';

import { ScheduleByIdResDto } from '../dto/schedule/res/schedule-by-id-res.dto';
import { ScheduleResDto } from '../dto/schedule/res/schedule-res.dto';
import { ScheduleEntity } from '../entities/schedule.entity';

@Injectable()
export class ScheduleRepository extends Repository<ScheduleEntity> {
	constructor(
		@InjectRepository(ScheduleEntity)
		private readonly repository: Repository<ScheduleEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getScheduleListOwnMemberId({
		memberId,
		take,
		skip,
	}: {
		memberId: string;
		take: number;
		skip: number;
	}): Promise<ScheduleResDto[]> {
		return await this.repository.find({
			select: {
				id: true,
				groupId: true,
				scheduleImage: true,
				scheduleName: true,
				startPeriod: true,
				endPeriod: true,
				updatedAt: true,
				schdulePeriods: {
					id: true,
					period: true,
					startTime: true,
					endTime: true,
					tourisms: {
						id: true,
						contentId: true,
						stayTime: true,
						tourismImage: true,
						title: true,
						position: true,
					},
				},
			},
			where: {
				memberId: memberId,
			},
			relations: {
				schdulePeriods: {
					tourisms: true,
				},
			},
			order: {
				updatedAt: 'desc',
				schdulePeriods: {
					period: 'ASC',
					tourisms: {
						position: 'ASC',
					},
				},
			},
			take,
			skip,
		});
	}

	async getOneScheduleById(scheduleId: string): Promise<ScheduleResDto | null> {
		return await this.repository.findOne({
			select: {
				id: true,
				groupId: true,
				updatedAt: true,
				schdulePeriods: {
					id: true,
					period: true,
					startTime: true,
					endTime: true,
					tourisms: {
						id: true,
						contentId: true,
						stayTime: true,
						tourismImage: true,
						title: true,
						position: true,
					},
				},
			},
			where: {
				id: scheduleId,
			},
			relations: {
				schdulePeriods: {
					tourisms: true,
				},
			},
			order: {
				updatedAt: 'desc',
				schdulePeriods: {
					period: 'ASC',
					tourisms: {
						position: 'ASC',
					},
				},
			},
		});
	}

	async findOrFailScheduleById({
		scheduleId,
	}: {
		scheduleId: string;
	}): Promise<ScheduleByIdResDto> {
		const schedule = await this.repository.findOneOrFail({
			where: {
				id: scheduleId,
			},
			select: {
				id: true,
			},
		});

		return schedule;
	}

	async findScheduleById(
		scheduleId: string,
	): Promise<ScheduleByIdResDto | null> {
		const schedule = await this.repository.findOne({
			where: {
				id: scheduleId,
			},
			select: {
				id: true,
			},
		});

		return schedule;
	}

	async createSchedule({
		memberId,
		groupId,
		scheduleName,
		startPeriod,
		endPeriod,
	}: ICreateScheduleArgs) {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			groupId: groupId,
			memberId: memberId,
			scheduleName,
			startPeriod,
			endPeriod,
		});

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailScheduleById({ scheduleId: id });
	}

	async updateScheduleGroup({
		memberId,
		groupId,
		scheduleId,
	}: {
		memberId: string;
		groupId: string;
		scheduleId: string;
	}) {
		await this.update({ id: scheduleId, memberId }, { groupId: groupId });

		return this.findOrFailScheduleById({ scheduleId: scheduleId });
	}

	async deleteSchedule(scheduleId: string): Promise<boolean> {
		const { affected } = await this.delete({
			id: scheduleId,
		});

		return !!affected;
	}

	async findOwnSchedule(
		scheduleId: string,
		memberId: string,
	): Promise<ScheduleByIdResDto | null> {
		return await this.repository.findOne({
			select: {
				id: true,
			},
			where: {
				id: scheduleId,
				memberId: memberId,
			},
		});
	}
}
