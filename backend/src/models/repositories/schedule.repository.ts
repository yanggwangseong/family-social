import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from '../entities/schedule.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScheduleRepository extends Repository<ScheduleEntity> {
	constructor(
		@InjectRepository(ScheduleEntity)
		private readonly repository: Repository<ScheduleEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findOrFailScheduleById({ scheduleId }: { scheduleId: string }) {
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

	async createSchedule({
		memberId,
		groupId,
	}: {
		memberId: string;
		groupId: string;
	}) {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			groupId: groupId,
			memberId: memberId,
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

	async deleteSchedule(scheduleId: string) {
		const { affected } = await this.delete({
			id: scheduleId,
		});

		return !!affected;
	}
}
