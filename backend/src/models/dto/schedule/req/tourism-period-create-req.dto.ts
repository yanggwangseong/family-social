import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';
import { PickType } from '@nestjs/swagger';
import { TourismCreateReqDto } from './tourism-create-req.dto';

export class TourismPeriodCreateReqDto extends PickType(TourismPeriodEntity, [
	'period',
	'startTime',
	'endTime',
] as const) {
	tourisms!: TourismCreateReqDto[];
}
