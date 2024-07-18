import { ApiProperty } from '@nestjs/swagger';

import { TourContentTypeId } from '@/types/type';

/**
 * 축제공연행사(15) Festival
 */
export class TourHttpFestivalResDto {
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
		description: '주최자정보',
	})
	sponsor1!: string;

	@ApiProperty({
		nullable: false,
		description: '주최자연락처',
	})
	sponsor1tel!: string;

	@ApiProperty({
		nullable: false,
		description: '주관사정보',
	})
	sponsor2!: string;

	@ApiProperty({
		nullable: false,
		description: '주관사연락처',
	})
	sponsor2tel!: string;

	@ApiProperty({
		nullable: false,
		description: '행사종료일',
	})
	eventenddate!: string;

	@ApiProperty({
		nullable: false,
		description: '공연시간',
	})
	playtime!: string;

	@ApiProperty({
		nullable: false,
		description: '행사장소',
	})
	eventplace!: string;

	@ApiProperty({
		nullable: false,
		description: '행사홈페이지',
	})
	eventhomepage!: string;

	@ApiProperty({
		nullable: false,
		description: '관람가능연령',
	})
	agelimit!: string;

	@ApiProperty({
		nullable: false,
		description: '예매처',
	})
	bookingplace!: string;

	@ApiProperty({
		nullable: false,
		description: '행사장위치안내',
	})
	placeinfo!: string;

	@ApiProperty({
		nullable: false,
		description: '부대행사',
	})
	subevent!: string;

	@ApiProperty({
		nullable: false,
		description: '행사프로그램',
	})
	program!: string;

	@ApiProperty({
		nullable: false,
		description: '행사시작일',
	})
	eventstartdate!: string;

	@ApiProperty({
		nullable: false,
		description: '이용요금',
	})
	usetimefestival!: string;

	@ApiProperty({
		nullable: false,
		description: '할인정보',
	})
	discountinfofestival!: string;

	@ApiProperty({
		nullable: false,
		description: '관람소요시간',
	})
	spendtimefestival!: string;

	@ApiProperty({
		nullable: false,
		description: '축제등급',
	})
	festivalgrade!: string;
}
