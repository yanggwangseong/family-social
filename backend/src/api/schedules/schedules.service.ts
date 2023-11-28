import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import { ICreateTourArgs, ICreateTourPeriodArgs } from '@/types/args/tour';
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

		await this.createTourismPeriod(periods, schedule.id);

		return schedule;
	}

	async updateToursSchedule({ memberId, groupId, scheduleId }: any) {
		const schedule = await this.scheduleRepository.updateScheduleGroup({
			memberId,
			groupId,
			scheduleId,
		});

		return schedule;
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

		createTourismPeriod.map(
			async (item) => await this.createTourism(item.tourisms, item.id),
		);
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
