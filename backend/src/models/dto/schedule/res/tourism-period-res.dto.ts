import { TourismPeriodEntity } from '@/models/entities/tourism-period.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { TourismResDto } from './tourism-res.dto';

export class TourismPeriodResDto extends PickType(TourismPeriodEntity, [
	'id',
	'period',
	'startTime',
	'endTime',
] as const) {
	@ApiProperty({
		nullable: false,
		type: [TourismResDto],
	})
	tourisms!: TourismResDto[];
}
