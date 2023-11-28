import { TourismEntity } from '@/models/entities/tourism.entity';
import { PickType } from '@nestjs/swagger';

export class TourismCreateReqDto extends PickType(TourismEntity, [
	'contentId',
	'stayTime',
	'tourismImage',
	'title',
	'position',
] as const) {}
