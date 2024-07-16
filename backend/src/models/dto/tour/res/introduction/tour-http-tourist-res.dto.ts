import { ApiProperty } from '@nestjs/swagger';

import { TourContentTypeId } from '@/types/type';

/**
 * 관광지(12) Tourist
 */
export class TourHttpTouristResDto {
	@ApiProperty({
		nullable: false,
		description: '콘텐츠ID',
	})
	contentid!: string;

	@ApiProperty({
		nullable: false,
		description: '콘텐츠타입ID',
	})
	contenttypeid!: TourContentTypeId;

	@ApiProperty({
		nullable: false,
		description: '세계문화유산유무',
	})
	heritage1!: string;

	@ApiProperty({
		nullable: false,
		description: '세계자연유산유무',
	})
	heritage2!: string;

	@ApiProperty({
		nullable: false,
		description: '세계기록유산유무',
	})
	heritage3!: string;

	@ApiProperty({
		nullable: false,
		description: '문의및안내',
	})
	infocenter!: string;

	@ApiProperty({
		nullable: false,
		description: '개장일',
	})
	opendate!: string;

	@ApiProperty({
		nullable: false,
		description: '쉬는날',
	})
	restdate!: string;

	@ApiProperty({
		nullable: false,
		description: '체험안내',
	})
	expguide!: string;

	@ApiProperty({
		nullable: false,
		description: '체험가능연령',
	})
	expagerange!: string;

	@ApiProperty({
		nullable: false,
		description: '수용인원',
	})
	accomcount!: string;

	@ApiProperty({
		nullable: false,
		description: '이용시기',
	})
	useseason!: string;

	@ApiProperty({
		nullable: false,
		description: '이용시간',
	})
	usetime!: string;

	@ApiProperty({
		nullable: false,
		description: '주차시설',
	})
	parking!: string;

	@ApiProperty({
		nullable: false,
		description: '유모차대여정보',
	})
	chkbabycarriage!: string;

	@ApiProperty({
		nullable: false,
		description: '애완동물동반가능정보',
	})
	chkpet!: string;

	@ApiProperty({
		nullable: false,
		description: '신용카드가능정보',
	})
	chkcreditcard!: string;
}
