import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { TourContentTypeId } from '@/types/type';

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
	contenttypeid!: TourContentTypeId;

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

	/**
	 * 등록일
	 */
	@Exclude({
		toPlainOnly: true,
	})
	createdtime!: string;

	/**
	 * 교과서속여행지 여부
	 */
	@Exclude({
		toPlainOnly: true,
	})
	booktour!: string;

	/**
	 * 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)
	 */
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd!: string;

	/**
	 * GPS X좌표
	 */
	@Exclude({
		toPlainOnly: true,
	})
	mapx!: string;

	/**
	 * GPS Y좌표
	 */
	@Exclude({
		toPlainOnly: true,
	})
	mapy!: string;

	/**
	 * Map Level
	 */
	@Exclude({
		toPlainOnly: true,
	})
	mlevel!: string;

	/**
	 * 수정일
	 */
	@Exclude({
		toPlainOnly: true,
	})
	modifiedtime!: string;
}
