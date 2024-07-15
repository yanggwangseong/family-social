import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class TourHttpFestivalScheduleResDto {
	@ApiProperty({
		nullable: false,
		description: '주소',
	})
	addr1!: string;

	@ApiProperty({
		nullable: false,
		description: '상세주소',
	})
	addr2!: string;

	@ApiProperty({
		nullable: false,
		description: '교과서속여행지 여부',
	})
	booktour!: string;

	@ApiProperty({
		nullable: false,
		description: '대분류',
	})
	cat1!: string;

	@ApiProperty({
		nullable: false,
		description: '중분류',
	})
	cat2!: string;

	@ApiProperty({
		nullable: false,
		description: '소분류',
	})
	cat3!: string;

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
		description: '등록일',
	})
	createdtime!: string;

	@ApiProperty({
		nullable: false,
		description: '이벤트 시작일',
	})
	eventstartdate!: string;

	@ApiProperty({
		nullable: false,
		description: '이벤트 종료일',
	})
	eventenddate!: string;

	@ApiProperty({
		nullable: false,
		description: '대표이미지(원본)',
	})
	firstimage!: string;

	@ApiProperty({
		nullable: false,
		description: '대표이미지',
	})
	firstimage2!: string;

	@ApiProperty({
		nullable: false,
		description:
			'저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)',
	})
	cpyrhtDivCd!: string;

	@ApiProperty({
		nullable: false,
		description: 'GPS X좌표',
	})
	mapx!: string;

	@ApiProperty({
		nullable: false,
		description: 'GPS Y좌표',
	})
	mapy!: string;

	@ApiProperty({
		nullable: false,
		description: 'Map Level',
	})
	mlevel!: string;

	@ApiProperty({
		nullable: false,
		description: '수정일',
	})
	@Exclude()
	modifiedtime!: string;

	@ApiProperty({
		nullable: false,
		description: '지역코드',
	})
	areacode!: string;

	@ApiProperty({
		nullable: false,
		description: '지역코드',
	})
	sigungucode!: string;

	@ApiProperty({
		nullable: false,
		description: '전화번호',
	})
	tel!: string;

	@ApiProperty({
		nullable: false,
		description: '제목',
	})
	title!: string;
}
