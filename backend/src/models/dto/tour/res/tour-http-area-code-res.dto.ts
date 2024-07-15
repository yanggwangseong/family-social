import { ApiProperty } from '@nestjs/swagger';

export class TourHttpAreaCodeResDto {
	@ApiProperty({
		nullable: false,
		description: '코드 : 지역코드또는시군구코드',
	})
	code!: string;

	@ApiProperty({
		nullable: false,
		description: '코드명 : 지역명또는시군구명',
	})
	name!: string;

	@ApiProperty({
		nullable: false,
		description: '일련번호',
	})
	rnum!: string;
}
