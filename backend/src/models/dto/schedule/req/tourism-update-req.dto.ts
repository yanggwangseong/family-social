import { PickType } from '@nestjs/swagger';

import { TourismEntity } from '@/models/entities/tourism.entity';

export class TourismUpdateReqDto extends PickType(TourismEntity, [
	'contentId',
	'stayTime',
	'tourismImage',
	'title',
	'position',
] as const) {}
