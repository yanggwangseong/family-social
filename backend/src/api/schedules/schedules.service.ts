import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';
import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import {
	ICreateTourArgs,
	ITourPeriodArgs,
	ITourismArgs,
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
		//const dates = getDateRange('2023-10-30', '2023-11-05');
		//프론트에서 기간 정하면 나눠지게 해주게 만들어서 서버로 보내줘야할듯?
		//배열 객체로 기간 시작시간, 종료시간 일정대로 받아서 저장
		//tourism_period 와 tourism 루프로 생성 해야 될것 같다.
		const schedule = await this.scheduleRepository.createSchedule({
			memberId,
			groupId,
		});
		console.log('fuck=', periods);
		await this.createTourismPeriod(periods, schedule.id);

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
