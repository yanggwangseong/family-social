import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';

export interface ICreateTourArgs {
	memberId: string;
	groupId: string;
	periods: TourismPeriodCreateReqDto[];
}

export interface ITourPeriodArgs {
	period: string;
	startTime: string;
	endTime: string;
	tourisms: ITourismArgs[];
}

export interface ITourismArgs {
	contentId: string;
	stayTime: string;
	tourismImage: string;
	title: string;
	position: number;
}
