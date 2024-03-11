import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
	EntityNotFoundException,
	ForBiddenException,
} from '@/common/exception/service.exception';
import {
	ERROR_NO_PERMISSTION_TO_SCHEDULE,
	ERROR_SCHEDULE_NOT_FOUND,
} from '@/constants/business-error';
import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';
import { ScheduleByIdResDto } from '@/models/dto/schedule/res/schedule-by-id-res.dto';
import { ScheduleResDto } from '@/models/dto/schedule/res/schedule-res.dto';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import { ICreateTourArgs, IUpdateTourArgs } from '@/types/args/tour';
import { getOffset } from '@/utils/getOffset';

@Injectable()
export class SchedulesService {
	constructor(
		private readonly scheduleRepository: ScheduleRepository,
		private readonly tourismPeriodRepository: TourismPeriodRepository,
		private readonly tourismRepository: TourismRepository,
	) {}

	async getScheduleListOwnMemberId({
		memberId,
		page,
		limit,
	}: {
		memberId: string;
		page: number;
		limit: number;
	}): Promise<ScheduleResDto> {
		const { take, skip } = getOffset({ page, limit });

		const [list, count] =
			await this.scheduleRepository.getScheduleListOwnMemberId({
				memberId,
				take,
				skip,
			});

		return {
			list: list,
			page: page,
			totalPage: Math.ceil(count / take),
		};
	}

	async getOneScheduleById(scheduleId: string) {
		const schedule = await this.scheduleRepository.getOneScheduleById(
			scheduleId,
		);

		if (!schedule) throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);

		return schedule;
	}

	async createToursSchedule(
		{ memberId, groupId, scheduleItem }: ICreateTourArgs,
		qr?: QueryRunner,
	): Promise<ScheduleByIdResDto> {
		const schedule = await this.scheduleRepository.createSchedule(
			{
				memberId,
				groupId,
				scheduleName: scheduleItem.scheduleName,
				startPeriod: scheduleItem.startPeriod,
				endPeriod: scheduleItem.endPeriod,
			},
			qr,
		);

		const createTourismPeriod = await this.createTourismPeriod(
			scheduleItem.periods,
			schedule.id,
		);

		createTourismPeriod.map(
			async (item) => await this.createTourism(item.tourisms, item.id),
		);

		return schedule;
	}

	async updateToursSchedule(
		{ memberId, groupId, scheduleId, periods }: IUpdateTourArgs,
		qr?: QueryRunner,
	): Promise<ScheduleByIdResDto> {
		const schedule = await this.scheduleRepository.updateScheduleGroup(
			{
				memberId,
				groupId,
				scheduleId,
			},
			qr,
		);

		// Tourism 먼저 다 삭제
		const periodIds =
			await this.tourismPeriodRepository.findTourismPeriodsByScheduleId(
				scheduleId,
			);
		periodIds.map(async (item) => await this.deleteTourism(item.id, qr));

		// TourismPeriod 다 삭제
		await this.deleteTourismPeriod(scheduleId, qr);

		// TourismPeriod 생성
		const createTourismPeriod = await this.createTourismPeriod(
			periods,
			schedule.id,
			qr,
		);

		// Tourism 생성
		createTourismPeriod.map(
			async (item) => await this.createTourism(item.tourisms, item.id, qr),
		);

		return schedule;
	}

	async updateScheduleTitleById(scheduleId: string, scheduleName: string) {
		return await this.scheduleRepository.updateScheduleTitleById(
			scheduleId,
			scheduleName,
		);
	}

	async updateScheduleThumbnail(scheduleId: string, imageUrl: string) {
		return await this.scheduleRepository.updateScheduleThumbnail(
			scheduleId,
			imageUrl,
		);
	}

	async deleteToursSchedule(
		scheduleId: string,
		qr?: QueryRunner,
	): Promise<void> {
		// Tourism 먼저 다 삭제
		const periodIds =
			await this.tourismPeriodRepository.findTourismPeriodsByScheduleId(
				scheduleId,
			);
		await Promise.all(
			periodIds.map(async (item) => await this.deleteTourism(item.id, qr)),
		);

		// TourismPeriod 다 삭제
		await this.deleteTourismPeriod(scheduleId, qr);

		// Schedule 삭제
		await this.scheduleRepository.deleteSchedule(scheduleId, qr);
	}

	async findOwnSchedule(
		scheduleId: string,
		memberId: string,
	): Promise<ScheduleByIdResDto> {
		const schedule = await this.scheduleRepository.findOwnSchedule(
			scheduleId,
			memberId,
		);
		if (!schedule) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_SCHEDULE);

		return schedule;
	}

	async findScheduleById(scheduleId: string): Promise<ScheduleByIdResDto> {
		const schedule = await this.scheduleRepository.findScheduleById(scheduleId);

		if (!schedule) throw EntityNotFoundException(ERROR_SCHEDULE_NOT_FOUND);

		return schedule;
	}

	private async deleteTourismPeriod(scheduleId: string, qr?: QueryRunner) {
		await this.tourismPeriodRepository.deleteTourismPeriod(scheduleId, qr);
	}

	private async deleteTourism(periodId: string, qr?: QueryRunner) {
		await this.tourismRepository.deleteTourism(periodId, qr);
	}

	private async createTourismPeriod(
		periods: TourismPeriodCreateReqDto[],
		scheduleId: string,
		qr?: QueryRunner,
	) {
		const createTourismPeriod = periods.map((item) => ({
			id: uuidv4(),
			scheduleId: scheduleId,
			...item,
		}));

		await this.tourismPeriodRepository.createTourismPeriod(
			createTourismPeriod,
			qr,
		);

		return createTourismPeriod;
	}

	private async createTourism(
		tourism: TourismCreateReqDto[],
		periodId: string,
		qr?: QueryRunner,
	) {
		const createTourisms = tourism.map((item) => ({
			id: uuidv4(),
			periodId,
			...item,
		}));

		await this.tourismRepository.createTourism(createTourisms, qr);
	}
}
