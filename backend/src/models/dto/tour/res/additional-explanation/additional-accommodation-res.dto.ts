import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * 숙박(32) Accommodation
 */
export class AdditionalAccommodationResDto {
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
		description: '객실코드',
	})
	roomcode!: string;

	@ApiProperty({
		nullable: false,
		description: '객실명칭',
	})
	roomtitle!: string;

	@ApiProperty({
		nullable: false,
		description: '객실크기(평)',
	})
	roomsize1!: string;

	@ApiProperty({
		nullable: false,
		description: '객실수',
	})
	roomcount!: string;

	@ApiProperty({
		nullable: false,
		description: '기준인원',
	})
	roombasecount!: string;

	@ApiProperty({
		nullable: false,
		description: '최대인원',
	})
	roommaxcount!: string;

	@ApiProperty({
		nullable: false,
		description: '비수기주중최소',
	})
	roomoffseasonminfee1!: string;

	@ApiProperty({
		nullable: false,
		description: '비수기주말최소',
	})
	roomoffseasonminfee2!: string;

	@ApiProperty({
		nullable: false,
		description: '성수기주중최소',
	})
	roompeakseasonminfee1!: string;

	@ApiProperty({
		nullable: false,
		description: '성수기주말최소',
	})
	roompeakseasonminfee2!: string;

	@ApiProperty({
		nullable: false,
		description: '객실소개',
	})
	roomintro!: string;

	@ApiProperty({
		nullable: false,
		description: '목욕시설여부',
	})
	roombathfacility!: string;

	@ApiProperty({
		nullable: false,
		description: '욕조여부',
	})
	roombath!: string;

	@ApiProperty({
		nullable: false,
		description: '홈시어터여부',
	})
	roomhometheater!: string;

	@ApiProperty({
		nullable: false,
		description: '에어컨여부',
	})
	roomaircondition!: string;

	@ApiProperty({
		nullable: false,
		description: 'TV 여부',
	})
	roomtv!: string;

	@ApiProperty({
		nullable: false,
		description: 'PC 여부',
	})
	roompc!: string;

	@ApiProperty({
		nullable: false,
		description: '인터넷여부',
	})
	roominternet!: string;

	@ApiProperty({
		nullable: false,
		description: '냉장고여부',
	})
	roomrefrigerator!: string;

	@ApiProperty({
		nullable: false,
		description: '객실크기(평방미터)',
	})
	roomsize2!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진1',
	})
	roomimg1!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진1 설명',
	})
	roomimg1alt!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진2',
	})
	roomimg2!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진2 설명',
	})
	roomimg2alt!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진3',
	})
	roomimg3!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진3',
	})
	roomimg3alt!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진4',
	})
	roomimg4!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진4 설명',
	})
	roomimg4alt!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진5',
	})
	roomimg5!: string;

	@ApiProperty({
		nullable: false,
		description: '객실사진5 설명',
	})
	roomimg5alt!: string;

	@ApiProperty({
		nullable: false,
		description: '케이블설치여부',
	})
	@Exclude({
		toPlainOnly: true,
	})
	roomcable!: string;

	@ApiProperty({
		nullable: false,
		description: '테이블여부',
	})
	@Exclude({
		toPlainOnly: true,
	})
	roomtable!: string;

	@ApiProperty({
		nullable: false,
		description: '세면도구여부',
	})
	@Exclude({
		toPlainOnly: true,
	})
	roomtoiletries!: string;

	@ApiProperty({
		nullable: false,
		description: '소파여부',
	})
	@Exclude({
		toPlainOnly: true,
	})
	roomsofa!: string;

	@ApiProperty({
		nullable: false,
		description: '취사용품여부',
	})
	@Exclude({
		toPlainOnly: true,
	})
	roomcook!: string;

	@ApiProperty({
		nullable: false,
		description: '드라이기여부',
	})
	@Exclude({
		toPlainOnly: true,
	})
	roomhairdryer!: string;

	@ApiProperty({
		nullable: false,
		description:
			'객실사진 1 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)',
	})
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd1!: string;

	@ApiProperty({
		nullable: false,
		description:
			'객실사진 2 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)',
	})
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd2!: string;

	@ApiProperty({
		nullable: false,
		description:
			'객실사진 3 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)',
	})
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd3!: string;

	@ApiProperty({
		nullable: false,
		description:
			'객실사진 4 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)',
	})
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd4!: string;

	@ApiProperty({
		nullable: false,
		description:
			'객실사진 5 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)',
	})
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd5!: string;
}
