import { ScheduleCreateReqDto } from '@/models/dto/schedule/req/schedule-create-req.dto';
import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';

export interface IUpdateTourArgs {
	memberId: string;
	groupId: string;
	scheduleId: string;
	periods: TourismPeriodCreateReqDto[];
}

export interface ICreateTourArgs {
	memberId: string;
	groupId: string;
	scheduleItem: ScheduleCreateReqDto;
}

export interface ICreateTourPeriodArgs {
	id: string;
	period: Date;
	startTime: Date;
	endTime: Date;
	scheduleId: string;
	tourisms: TourismCreateReqDto[];
}

export interface ICreateTourismArgs {
	id: string;
	periodId: string;
	contentId: string;
	stayTime: Date;
	tourismImage: string;
	title: string;
	position: number;
}
