import { ForBiddenException } from '@/common/exception/service.exception';
import { ERROR_NO_PERMISSTION_TO_SCHEDULE } from '@/constants/business-error';
import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import {
	ICreateTourArgs,
	ICreateTourPeriodArgs,
	IUpdateTourArgs,
} from '@/types/args/tour';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SchedulesService {
	constructor(
		private readonly scheduleRepository: ScheduleRepository,
		private readonly tourismPeriodRepository: TourismPeriodRepository,
		private readonly tourismRepository: TourismRepository,
	) {}

	async createToursSchedule({ memberId, groupId, periods }: ICreateTourArgs) {
		const schedule = await this.scheduleRepository.createSchedule({
			memberId,
			groupId,
		});

		const createTourismPeriod = await this.createTourismPeriod(
			periods,
			schedule.id,
		);

		createTourismPeriod.map(
			async (item) => await this.createTourism(item.tourisms, item.id),
		);

		return schedule;
	}

	async updateToursSchedule({
		memberId,
		groupId,
		scheduleId,
		periods,
	}: IUpdateTourArgs) {
		const schedule = await this.scheduleRepository.updateScheduleGroup({
			memberId,
			groupId,
			scheduleId,
		});

		// Tourism 먼저 다 삭제
		const periodIds =
			await this.tourismPeriodRepository.findTourismPeriodsByScheduleId(
				scheduleId,
			);
		periodIds.map(async (item) => await this.deleteTourism(item.id));

		// TourismPeriod 다 삭제
		await this.deleteTourismPeriod(scheduleId);

		// TourismPeriod 생성
		const createTourismPeriod = await this.createTourismPeriod(
			periods,
			schedule.id,
		);

		// Tourism 생성
		createTourismPeriod.map(
			async (item) => await this.createTourism(item.tourisms, item.id),
		);

		return schedule;
	}

	async deleteToursSchedule(scheduleId: string) {
		// Tourism 먼저 다 삭제
		const periodIds =
			await this.tourismPeriodRepository.findTourismPeriodsByScheduleId(
				scheduleId,
			);
		periodIds.map(async (item) => await this.deleteTourism(item.id));

		// TourismPeriod 다 삭제
		await this.deleteTourismPeriod(scheduleId);

		// Schedule 삭제
		await this.scheduleRepository.deleteSchedule(scheduleId);
	}

	async findOwnSchedule(scheduleId: string, memberId: string) {
		const schedule = await this.scheduleRepository.findOwnSchedule(
			scheduleId,
			memberId,
		);
		if (!schedule) throw ForBiddenException(ERROR_NO_PERMISSTION_TO_SCHEDULE);

		return schedule;
	}

	private async deleteTourismPeriod(scheduleId: string) {
		await this.tourismPeriodRepository.deleteTourismPeriod(scheduleId);
	}

	private async deleteTourism(periodId: string) {
		await this.tourismRepository.deleteTourism(periodId);
	}

	private async createTourismPeriod(
		periods: TourismPeriodCreateReqDto[],
		scheduleId: string,
	) {
		const createTourismPeriod = periods.map((item) => ({
			id: uuidv4(),
			scheduleId: scheduleId,
			...item,
		}));

		await this.tourismPeriodRepository.createTourismPeriod(createTourismPeriod);

		return createTourismPeriod;
	}

	private async createTourism(
		tourism: TourismCreateReqDto[],
		periodId: string,
	) {
		const createTourisms = tourism.map((item) => ({
			id: uuidv4(),
			periodId,
			...item,
		}));

		await this.tourismRepository.createTourism(createTourisms);
	}
}
