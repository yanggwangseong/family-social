import { ApiProperty } from '@nestjs/swagger';

/**
 * 레포츠(28) Leisure
 */
export class TourHttpLeisureResDto {
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
		description: '개장기간',
	})
	openperiod!: string;

	@ApiProperty({
		nullable: false,
		description: '예약안내',
	})
	reservation!: string;

	@ApiProperty({
		nullable: false,
		description: '문의및안내',
	})
	infocenterleports!: string;

	@ApiProperty({
		nullable: false,
		description: '규모',
	})
	scaleleports!: string;

	@ApiProperty({
		nullable: false,
		description: '수용인원',
	})
	accomcountleports!: string;

	@ApiProperty({
		nullable: false,
		description: '쉬는날',
	})
	restdateleports!: string;

	@ApiProperty({
		nullable: false,
		description: '이용시간',
	})
	usetimeleports!: string;

	@ApiProperty({
		nullable: false,
		description: '입장료',
	})
	usefeeleports!: string;

	@ApiProperty({
		nullable: false,
		description: '체험가능연령',
	})
	expagerangeleports!: string;

	@ApiProperty({
		nullable: false,
		description: '주차시설',
	})
	parkingleports!: string;

	@ApiProperty({
		nullable: false,
		description: '주차요금',
	})
	parkingfeeleports!: string;

	@ApiProperty({
		nullable: false,
		description: '유모차대여정보',
	})
	chkbabycarriageleports!: string;

	@ApiProperty({
		nullable: false,
		description: '애완동물동반가능정보',
	})
	chkpetleports!: string;

	@ApiProperty({
		nullable: false,
		description: '신용카드가능정보',
	})
	chkcreditcardleports!: string;
}
