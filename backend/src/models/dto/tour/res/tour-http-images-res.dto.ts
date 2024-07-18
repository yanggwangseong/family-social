import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class TourHttpImagesResDto {
	@ApiProperty({
		nullable: false,
		description: '콘텐츠ID',
	})
	contentid!: string;

	@ApiProperty({
		nullable: false,
		description: '이미지명',
	})
	imgname!: string;

	@ApiProperty({
		nullable: false,
		description: '원본이미지',
	})
	originimgurl!: string;

	@ApiProperty({
		nullable: false,
		description: '썸네일이미지',
	})
	smallimageurl!: string;

	/**
	 * 저작권 유형 (Type1:제1유형(출처표시-권장), Type3:제3유형(제1유형+변경금지)
	 */
	@Exclude({
		toPlainOnly: true,
	})
	cpyrhtDivCd!: string;

	/**
	 * 이미지일련번호
	 */
	@Exclude({
		toPlainOnly: true,
	})
	serialnum!: string;
}
