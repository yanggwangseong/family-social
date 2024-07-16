import { ApiProperty } from '@nestjs/swagger';

/**
 * 음식점(39) Restaurant
 */
export class TourHttpRestaurantResDto {
	@ApiProperty({
		nullable: false,
		description: '콘텐츠ID',
	})
	contentid!: string;

	@ApiProperty({
		nullable: false,
		description: '콘텐츠타입ID',
	})
	contenttypeid!: string;

	@ApiProperty({
		nullable: false,
		description: '좌석수',
	})
	seat!: string;

	@ApiProperty({
		nullable: false,
		description: '어린이놀이방여부',
	})
	kidsfacility!: string;

	@ApiProperty({
		nullable: false,
		description: '대표메뉴',
	})
	firstmenu!: string;

	@ApiProperty({
		nullable: false,
		description: '취급메뉴',
	})
	treatmenu!: string;

	@ApiProperty({
		nullable: false,
		description: '금연/흡연여부',
	})
	smoking!: string;

	@ApiProperty({
		nullable: false,
		description: '문의및안내',
	})
	infocenterfood!: string;

	@ApiProperty({
		nullable: false,
		description: '규모',
	})
	scalefood!: string;

	@ApiProperty({
		nullable: false,
		description: '주차시설',
	})
	parkingfood!: string;

	@ApiProperty({
		nullable: false,
		description: '개업일',
	})
	opendatefood!: string;

	@ApiProperty({
		nullable: false,
		description: '영업시간',
	})
	opentimefood!: string;

	@ApiProperty({
		nullable: false,
		description: '할인정보',
	})
	discountinfofood!: string;

	@ApiProperty({
		nullable: false,
		description: '신용카드가능정보',
	})
	chkcreditcardfood!: string;

	@ApiProperty({
		nullable: false,
		description: '예약안내',
	})
	reservationfood!: string;

	@ApiProperty({
		nullable: false,
		description: '인허가번호',
	})
	lcnsno!: string;
}
