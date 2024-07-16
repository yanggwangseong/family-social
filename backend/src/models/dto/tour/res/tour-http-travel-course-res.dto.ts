import { ApiProperty } from '@nestjs/swagger';

/**
 * 여행코스(25) travel-course
 */
export class TourHttpTravelCourseResDto {
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
		description: '문의및안내',
	})
	infocentertourcourse!: string;

	@ApiProperty({
		nullable: false,
		description: '코스총거리',
	})
	distance!: string;

	@ApiProperty({
		nullable: false,
		description: '코스일정',
	})
	schedule!: string;

	@ApiProperty({
		nullable: false,
		description: '코스총소요시간',
	})
	taketime!: string;

	@ApiProperty({
		nullable: false,
		description: '코스테마',
	})
	theme!: string;
}
