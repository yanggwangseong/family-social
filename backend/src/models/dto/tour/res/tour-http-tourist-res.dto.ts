import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { TourContentTypeId } from '@/types/type';

/**
 * 관광지(12) Tourist
 */
export class TourHttpTouristResDto {
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
		description: '콘텐츠명(제목)',
	})
	title!: string;

	@ApiProperty({
		nullable: false,
		description: '전화번호',
	})
	tel!: string;

	@ApiProperty({
		nullable: false,
		description: '전화번호명',
	})
	telname!: string;

	@ApiProperty({
		nullable: false,
		description: '전화번호명',
	})
	homepage!: string;

	@ApiProperty({
		nullable: false,
		description: '대표이미지(원본)',
	})
	firstimage!: string;

	@ApiProperty({
		nullable: false,
		description: '대표이미지(썸네일)',
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
		description: '우편번호',
	})
	zipcode!: string;

	@ApiProperty({
		nullable: false,
		description: '개요',
	})
	overview!: string;

	@ApiProperty({
		nullable: false,
		description: '등록일',
	})
	@Exclude({
		toPlainOnly: true,
	})
	createdtime!: string;

	@ApiProperty({
		nullable: false,
		description: '수정일',
	})
	@Exclude({
		toPlainOnly: true,
	})
	modifiedtime!: string;

	@ApiProperty({
		nullable: false,
		description: '교과서여행지여부',
	})
	@Exclude({
		toPlainOnly: true,
	})
	booktour!: string;

	@ApiProperty({
		nullable: false,
		description:
			'저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)',
	})
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd!: string;

	@ApiProperty({
		nullable: false,
		description: 'GPS X좌표',
	})
	@Exclude({
		toPlainOnly: true,
	})
	mapx!: string;

	@ApiProperty({
		nullable: false,
		description: 'GPS Y좌표',
	})
	@Exclude({
		toPlainOnly: true,
	})
	mapy!: string;

	@ApiProperty({
		nullable: false,
		description: 'Map Level',
	})
	@Exclude({
		toPlainOnly: true,
	})
	mlevel!: string;

	@Expose({
		toPlainOnly: true,
	})
	get fullAddr() {
		return `(${this.areacode}) ${this.addr1} ${this.addr2}`;
	}
}
