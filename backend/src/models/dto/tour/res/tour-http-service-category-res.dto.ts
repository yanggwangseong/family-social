import { ApiProperty } from '@nestjs/swagger';

export class TourHttpServiceCategoryResDto {
	@ApiProperty({
		nullable: false,
		description: '코드 : 대,중,소분류코드',
	})
	code!: string;

	@ApiProperty({
		nullable: false,
		description: '코드명 : 대,중,소분류코드명',
	})
	name!: string;

	@ApiProperty({
		nullable: false,
		description: '일련번호',
	})
	rnum!: string;
}
