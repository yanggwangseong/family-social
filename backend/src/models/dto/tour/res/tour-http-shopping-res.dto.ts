import { ApiProperty } from '@nestjs/swagger';

import { TourContentTypeId } from '@/types/type';

/**
 * 쇼핑(38) shopping
 */
export class TourHttpShoppingResDto {
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
		description: '판매품목',
	})
	saleitem!: string;

	@ApiProperty({
		nullable: false,
		description: '판매품목별가격',
	})
	saleitemcost!: string;

	@ApiProperty({
		nullable: false,
		description: '장서는날',
	})
	fairday!: string;

	@ApiProperty({
		nullable: false,
		description: '개장일',
	})
	opendateshopping!: string;

	@ApiProperty({
		nullable: false,
		description: '매장안내',
	})
	shopguide!: string;

	@ApiProperty({
		nullable: false,
		description: '문화센터바로가기',
	})
	culturecenter!: string;

	@ApiProperty({
		nullable: false,
		description: '화장실설명',
	})
	restroom!: string;

	@ApiProperty({
		nullable: false,
		description: '문의및안내',
	})
	infocentershopping!: string;

	@ApiProperty({
		nullable: false,
		description: '규모',
	})
	scaleshopping!: string;

	@ApiProperty({
		nullable: false,
		description: '쉬는날',
	})
	restdateshopping!: string;

	@ApiProperty({
		nullable: false,
		description: '주차시설',
	})
	parkingshopping!: string;

	@ApiProperty({
		nullable: false,
		description: '유모차대여정보',
	})
	chkbabycarriageshopping!: string;

	@ApiProperty({
		nullable: false,
		description: '애완동물동반가능정보',
	})
	chkpetshopping!: string;

	@ApiProperty({
		nullable: false,
		description: '신용카드가능정보',
	})
	chkcreditcardshopping!: string;

	@ApiProperty({
		nullable: false,
		description: '영업시간',
	})
	opentime!: string;
}
