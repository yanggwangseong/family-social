import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * 문화시설(14), 관광지(12), 축제공연행사(15), 28(레저), 38(쇼핑), 39(음식점)
 *
 */
export class AdditionalCommonResDto {
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
		description: '제목',
	})
	infoname!: string;

	@ApiProperty({
		nullable: false,
		description: '내용',
	})
	infotext!: string;

	@ApiProperty({
		nullable: false,
		description: '일련번호',
	})
	@Exclude({
		toPlainOnly: true,
	})
	fldgubun!: string;

	@ApiProperty({
		nullable: false,
		description: '숙박/여행코스제외타입 : 반복일련번호',
	})
	@Exclude({
		toPlainOnly: true,
	})
	serialnum!: string;
}
