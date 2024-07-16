import { ApiProperty } from '@nestjs/swagger';

// 여행코스(25)
export class AdditionalTravelCourseResDto {
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
		description: '반복일련번호',
	})
	subnum!: string;

	@ApiProperty({
		nullable: false,
		description: '하위콘텐츠ID',
	})
	subcontentid!: string;

	@ApiProperty({
		nullable: false,
		description: '코스명',
	})
	subname!: string;

	@ApiProperty({
		nullable: false,
		description: '코스개요',
	})
	subdetailoverview!: string;

	@ApiProperty({
		nullable: false,
		description: '코스이미지',
	})
	subdetailimg!: string;

	@ApiProperty({
		nullable: false,
		description: '코스이미지설명',
	})
	subdetailalt!: string;
}
