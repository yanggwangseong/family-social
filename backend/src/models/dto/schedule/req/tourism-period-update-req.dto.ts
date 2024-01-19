import { PickType } from '@nestjs/swagger';

import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';

import { TourismUpdateReqDto } from './tourism-update-req.dto';

export class TourismPeriodUpdateReqDto extends PickType(TourismPeriodEntity, [
	'period',
	'startTime',
	'endTime',
] as const) {
	tourisms!: TourismUpdateReqDto[];
}
