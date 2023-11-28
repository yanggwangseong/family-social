import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';

export interface ICreateTourArgs {
	memberId: string;
	groupId: string;
	periods: TourismPeriodCreateReqDto[];
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
