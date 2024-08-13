import { PickType } from '@nestjs/swagger';

import { TourismEntity } from '@/models/entities/tourism.entity';

export class TourismResDto extends PickType(TourismEntity, [
	'id',
	'contentId',
	'stayTime',
	'tourismImage',
	'title',
	'position',
	'stayTimeWritable',
] as const) {}
