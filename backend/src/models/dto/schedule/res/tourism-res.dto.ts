import { TourismEntity } from '@/models/entities/tourism.entity';
import { PickType } from '@nestjs/swagger';

export class TourismResDto extends PickType(TourismEntity, [
	'id',
	'contentId',
	'stayTime',
	'tourismImage',
	'title',
	'position',
] as const) {}
