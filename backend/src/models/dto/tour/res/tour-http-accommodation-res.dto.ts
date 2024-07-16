import { ApiProperty } from '@nestjs/swagger';

/**
 * 숙박(32) Accommodation
 */
export class TourHttpAccommodationResDto {
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
		description: '굿스테이여부',
	})
	goodstay!: string;

	@ApiProperty({
		nullable: false,
		description: '베니키아여부',
	})
	benikia!: string;

	@ApiProperty({
		nullable: false,
		description: '한옥여부',
	})
	hanok!: string;

	@ApiProperty({
		nullable: false,
		description: '객실수',
	})
	roomcount!: string;

	@ApiProperty({
		nullable: false,
		description: '객실유형',
	})
	roomtype!: string;

	@ApiProperty({
		nullable: false,
		description: '환불규정',
	})
	refundregulation!: string;

	@ApiProperty({
		nullable: false,
		description: '입실시간',
	})
	checkintime!: string;

	@ApiProperty({
		nullable: false,
		description: '퇴실시간',
	})
	checkouttime!: string;

	@ApiProperty({
		nullable: false,
		description: '객실내취사여부',
	})
	chkcooking!: string;

	@ApiProperty({
		nullable: false,
		description: '세미나실여부',
	})
	seminar!: string;

	@ApiProperty({
		nullable: false,
		description: '스포츠시설여부',
	})
	sports!: string;

	@ApiProperty({
		nullable: false,
		description: '사우나실여부',
	})
	sauna!: string;

	@ApiProperty({
		nullable: false,
		description: '뷰티시설정보',
	})
	beauty!: string;

	@ApiProperty({
		nullable: false,
		description: '식음료장여부',
	})
	beverage!: string;

	@ApiProperty({
		nullable: false,
		description: '노래방여부',
	})
	karaoke!: string;

	@ApiProperty({
		nullable: false,
		description: '바비큐장여부',
	})
	barbecue!: string;

	@ApiProperty({
		nullable: false,
		description: '캠프파이어여부',
	})
	campfire!: string;

	@ApiProperty({
		nullable: false,
		description: '자전거대여여부',
	})
	bicycle!: string;

	@ApiProperty({
		nullable: false,
		description: '휘트니스센터여부',
	})
	fitness!: string;

	@ApiProperty({
		nullable: false,
		description: '공용 PC실여부',
	})
	publicpc!: string;

	@ApiProperty({
		nullable: false,
		description: '공용샤워실여부',
	})
	publicbath!: string;

	@ApiProperty({
		nullable: false,
		description: '부대시설 (기타)',
	})
	subfacility!: string;

	@ApiProperty({
		nullable: false,
		description: '식음료장',
	})
	foodplace!: string;

	@ApiProperty({
		nullable: false,
		description: '예약안내홈페이지',
	})
	reservationurl!: string;

	@ApiProperty({
		nullable: false,
		description: '픽업서비스',
	})
	pickup!: string;

	@ApiProperty({
		nullable: false,
		description: '문의및안내',
	})
	infocenterlodging!: string;

	@ApiProperty({
		nullable: false,
		description: '주차시설',
	})
	parkinglodging!: string;

	@ApiProperty({
		nullable: false,
		description: '예약안내',
	})
	reservationlodging!: string;

	@ApiProperty({
		nullable: false,
		description: '규모',
	})
	scalelodging!: string;

	@ApiProperty({
		nullable: false,
		description: '수용가능인원',
	})
	accomcountlodging!: string;
}
