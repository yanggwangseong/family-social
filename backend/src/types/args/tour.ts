import { ScheduleCreateReqDto } from '@/models/dto/schedule/req/schedule-create-req.dto';
import { TourismCreateReqDto } from '@/models/dto/schedule/req/tourism-create-req.dto';

export interface IUpdateTourArgs extends ICreateTourArgs {
	scheduleId: string;
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

export interface TourHttpResponse<T> {
	response: {
		header: TourHttpHeader;
		body: TourHttpBody<T>;
	};
}

export interface TourHttpHeader {
	resultMsg: string;
	resultCode: string;
}

export interface TourHttpBody<T> {
	numOfRows: number;
	pageNo: number;
	totalCount: number;
	items: TourHttpItem<T>;
}

export interface TourHttpItem<T> {
	item: T[];
}
