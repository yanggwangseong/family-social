import { PickType } from '@nestjs/swagger';

import { TourismEntity } from '@/models/entities/tourism.entity';

export class TourismCreateReqDto extends PickType(TourismEntity, [
	'contentId',
	'stayTime',
	'tourismImage',
	'title',
	'position',
	'stayTimeWritable',
] as const) {}
