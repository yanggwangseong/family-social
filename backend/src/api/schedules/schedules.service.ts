import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import { ICreateTourArgs } from '@/types/args/tour';
import { Injectable } from '@nestjs/common';

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

		// periods.map((item) => {
		// 	console.log(item.tourisms.)
		// })

		return schedule;
	}
}
