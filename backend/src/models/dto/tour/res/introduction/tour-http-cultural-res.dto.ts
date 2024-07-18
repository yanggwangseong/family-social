import { ApiProperty } from '@nestjs/swagger';

import { TourContentTypeId } from '@/types/type';

/**
 * 문화시설(14) Cultural
 */
export class TourHttpCulturalResDto {
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
		description: '규모',
	})
	scale!: string;

	@ApiProperty({
		nullable: false,
		description: '이용요금',
	})
	usefee!: string;

	@ApiProperty({
		nullable: false,
		description: '할인정보',
	})
	discountinfo!: string;

	@ApiProperty({
		nullable: false,
		description: '관람소요시간',
	})
	spendtime!: string;

	@ApiProperty({
		nullable: false,
		description: '주차요금',
	})
	parkingfee!: string;

	@ApiProperty({
		nullable: false,
		description: '문의및안내',
	})
	infocenterculture!: string;

	@ApiProperty({
		nullable: false,
		description: '수용인원',
	})
	accomcountculture!: string;

	@ApiProperty({
		nullable: false,
		description: '이용시간',
	})
	usetimeculture!: string;

	@ApiProperty({
		nullable: false,
		description: '쉬는날',
	})
	restdateculture!: string;

	@ApiProperty({
		nullable: false,
		description: '주차시설',
	})
	parkingculture!: string;

	@ApiProperty({
		nullable: false,
		description: '유모차대여정보',
	})
	chkbabycarriageculture!: string;

	@ApiProperty({
		nullable: false,
		description: '애완동물동반가능정보',
	})
	chkpetculture!: string;

	@ApiProperty({
		nullable: false,
		description: '신용카드가능정보',
	})
	chkcreditcardculture!: string;
}
