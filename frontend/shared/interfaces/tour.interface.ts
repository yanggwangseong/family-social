import { OmitStrict, Union } from 'types';
import { BasicPaginationResponse } from './pagination.interface';
import { TourLayerMode } from '@/components/ui/tour/TourIntroductionController';

export type TourContentTypeId =
	| '12'
	| '14'
	| '15'
	| '25'
	| '28'
	| '32'
	| '38'
	| '39';

export interface TourAreaCodeItem {
	code: string;
	name: string;
	rnum: number;
}

// getServiceCategories
export interface TourServiceCategoriesResponse extends TourAreaCodeItem {}

export interface TourResponseItem {
	kind: 'tour';
	addr1: string;
	addr2: string;
	areacode: string;
	cat1: string;
	cat2: string;
	cat3: string;
	contentid: string;
	contenttypeid: string;
	firstimage: string;
	firstimage2: string;
	sigungucode: string;
	tel: string;
	title: string;
	zipcode: string;
	fullAddr: string;
}

export interface TourFestivalItem {
	kind: 'festival';
	addr1: string;
	addr2: string;
	cat1: string;
	cat2: string;
	cat3: string;
	contentid: string;
	contenttypeid: string;
	eventstartdate: string;
	eventenddate: string;
	firstimage: string;
	firstimage2: string;
	areacode: string;
	sigungucode: string;
	tel: string;
	title: string;
}

export interface TourSearchItem
	extends OmitStrict<
		TourFestivalItem,
		'eventenddate' | 'eventstartdate' | 'kind'
	> {
	kind: 'search';
	zipcode: string;
	fullAddr: string;
}

export interface TourDetailItem {
	contentid: string;
	contenttypeid: string;
	title: string;
	tel: string;
	telname: string;
	homepage: string;
	firstimage: string;
	firstimage2: string;
	areacode: string;
	sigungucode: string;
	cat1: string;
	cat2: string;
	cat3: string;
	addr1: string;
	addr2: string;
	zipcode: string;
	overview: string;
	fullAddr: string;
}

export interface TourImageItem {
	contentid: string;
	imgname: string;
	originimgurl: string;
	smallimageurl: string;
}

export type TourAdditionalUnionType =
	| TourAdditionalCommon
	| TourAdditionalTourCourse
	| TourAdditionalAccomodation;

/**
 * 반복 추가 정보 공통조회 (12, 14, 15, 25, 28, 32, 38, 39)
 *
 */
export interface TourAdditionalCommon {
	kind: 'additionalCommon';
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/**
	 * 제목
	 */
	infoname: string;
	/**
	 * 내용
	 */
	infotext: string;
}

/**
 * 반복 추가 정보 여행코스조회 (25)
 *
 */
export interface TourAdditionalTourCourse {
	kind: 'additionalTourCourse';
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/**
	 * 반복일련번호
	 */
	subnum: string;
	/**
	 * 하위콘텐츠ID
	 */
	subcontentid: string;

	/**
	 * 코스명
	 */
	subname: string;

	/**
	 * 코스개요
	 */
	subdetailoverview: string;

	/**
	 * 코스이미지
	 */
	subdetailimg: string;

	/**
	 * 코스이미지설명
	 */
	subdetailalt: string;
}

/**
 * 반복 추가 정보 숙박조회 (32)
 *
 */
export interface TourAdditionalAccomodation {
	kind: 'additionalAccomodation';
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/**
	 * 객실코드
	 */
	roomcode: string;
	/**
	 * 객실명칭
	 */
	roomtitle: string;
	/**
	 * 객실크기(평)
	 */
	roomsize1: string;
	/**
	 * 객실수
	 */
	roomcount: string;
	/**
	 * 기준인원
	 */
	roombasecount: string;
	/**
	 * 최대인원
	 */
	roommaxcount: string;
	/**
	 * 비수기주중최소
	 */
	roomoffseasonminfee1: string;
	/**
	 * 비수기주말최소
	 */
	roomoffseasonminfee2: string;
	/**
	 * 성수기주중최소
	 */
	roompeakseasonminfee1: string;
	/**
	 * 성수기주말최소
	 */
	roompeakseasonminfee2: string;
	/**
	 * 객실소개
	 */
	roomintro: string;
	/**
	 * 목욕시설여부
	 */
	roombathfacility: string;
	/**
	 * 욕조여부
	 */
	roombath: string;
	/**
	 * 홈시어터여부
	 */
	roomhometheater: string;
	/**
	 * 에어컨여부
	 */
	roomaircondition: string;
	/**
	 * TV 여부
	 */
	roomtv: string;
	/**
	 * PC 여부
	 */
	roompc: string;
	/**
	 * 인터넷여부
	 */
	roominternet: string;
	/**
	 * 냉장고여부
	 */
	roomrefrigerator: string;
	/**
	 * 객실크기(평방미터)
	 */
	roomsize2: string;
	/**
	 * 객실사진1
	 */
	roomimg1: string;
	/**
	 * 객실사진1 설명
	 */
	roomimg1alt: string;
	/**
	 * 객실사진2
	 */
	roomimg2: string;
	/**
	 * 객실사진2 설명
	 */
	roomimg2alt: string;
	/**
	 * 객실사진3
	 */
	roomimg3: string;
	/**
	 * 객실사진3
	 */
	roomimg3alt: string;
	/**
	 * 객실사진4
	 */
	roomimg4: string;
	/**
	 * 객실사진4 설명
	 */
	roomimg4alt: string;
	/**
	 * 객실사진5
	 */
	roomimg5: string;
	/**
	 * 객실사진5 설명
	 */
	roomimg5alt: string;
}

export interface TourIntroductionUnionTypeResponse<T>
	extends BasicPaginationResponse<T> {
	kind: Union<typeof TourLayerMode>;
}

export type TourIntroductionUnionType =
	| TourIntroductionUnionTypeResponse<TourIntroductionTourist>
	| TourIntroductionUnionTypeResponse<TourIntroductionCultural>
	| TourIntroductionUnionTypeResponse<TourIntroductionFestival>
	| TourIntroductionUnionTypeResponse<TourIntroductionTourCourse>
	| TourIntroductionUnionTypeResponse<TourIntroductionLeports>
	| TourIntroductionUnionTypeResponse<TourIntroductionAccomodation>
	| TourIntroductionUnionTypeResponse<TourIntroductionShopping>
	| TourIntroductionUnionTypeResponse<TourIntroductionRestaurant>;

/**
 * 소개 정보 관광지조회 (12)
 *
 */
export interface TourIntroductionTourist {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 세계문화유산유무 */
	heritage1: string;
	/** 세계자연유산유무 */
	heritage2: string;
	/** 세계기록유산유무 */
	heritage3: string;
	/** 문의및안내 */
	infocenter: string;
	/** 개장일 */
	opendate: string;
	/** 쉬는날 */
	restdate: string;
	/** 체험안내 */
	expguide: string;
	/** 체험가능연령 */
	expagerange: string;
	/** 수용인원 */
	accomcount: string;
	/** 이용시기 */
	useseason: string;
	/** 이용시간 */
	usetime: string;
	/** 주차시설 */
	parking: string;
	/** 유모차대여정보 */
	chkbabycarriage: string;
	/** 애완동물동반가능정보 */
	chkpet: string;
	/** 신용카드가능정보 */
	chkcreditcard: string;
}

/**
 * 소개 정보 문화시설 (14)
 *
 */
export interface TourIntroductionCultural {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 규모 */
	scale: string;
	/** 이용요금 */
	usefee: string;
	/** 할인정보 */
	discountinfo: string;
	/** 관람소요시간 */
	spendtime: string;
	/** 주차요금 */
	parkingfee: string;
	/** 문의및안내 */
	infocenterculture: string;
	/** 수용인원 */
	accomcountculture: string;
	/** 이용시간 */
	usetimeculture: string;
	/** 쉬는날 */
	restdateculture: string;
	/** 주차시설 */
	parkingculture: string;
	/** 유모차대여정보 */
	chkbabycarriageculture: string;
	/** 애완동물동반가능정보 */
	chkpetculture: string;
	/** 신용카드가능정보 */
	chkcreditcardculture: string;
}

/**
 * 소개 정보 축제공연행사 (15)
 *
 */
export interface TourIntroductionFestival {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 주최자정보 */
	sponsor1: string;
	/** 주최자연락처 */
	sponsor1tel: string;
	/** 주관사정보 */
	sponsor2: string;
	/** 주관사연락처 */
	sponsor2tel: string;
	/** 행사종료일 */
	eventenddate: string;
	/** 공연시간 */
	playtime: string;
	/** 행사장소 */
	eventplace: string;
	/** 행사홈페이지 */
	eventhomepage: string;
	/** 관람가능연령 */
	agelimit: string;
	/** 예매처 */
	bookingplace: string;
	/** 행사장위치안내 */
	placeinfo: string;
	/** 부대행사 */
	subevent: string;
	/** 행사프로그램 */
	program: string;
	/** 행사시작일 */
	eventstartdate: string;
	/** 이용요금 */
	usetimefestival: string;
	/** 할인정보 */
	discountinfofestival: string;
	/** 관람소요시간 */
	spendtimefestival: string;
	/** 축제등급 */
	festivalgrade: string;
}

/**
 * 소개 정보 여행코스 (25)
 *
 */
export interface TourIntroductionTourCourse {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 문의및안내 */
	infocentertourcourse: string;
	/** 코스총거리 */
	distance: string;
	/** 코스일정 */
	schedule: string;
	/** 코스총소요시간 */
	taketime: string;
	/** 코스테마 */
	theme: string;
}

/**
 * 소개 정보 레저 (28)
 *
 */
export interface TourIntroductionLeports {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 개장기간 */
	openperiod: string;
	/** 예약안내 */
	reservation: string;
	/** 문의및안내 */
	infocenterleports: string;
	/** 규모 */
	scaleleports: string;
	/** 수용인원 */
	accomcountleports: string;
	/** 쉬는날 */
	restdateleports: string;
	/** 이용시간 */
	usetimeleports: string;
	/** 입장료 */
	usefeeleports: string;
	/** 체험가능연령 */
	expagerangeleports: string;
	/** 주차시설 */
	parkingleports: string;
	/** 주차요금 */
	parkingfeeleports: string;
	/** 유모차대여정보 */
	chkbabycarriageleports: string;
	/** 애완동물동반가능정보 */
	chkpetleports: string;
	/** 신용카드가능정보 */
	chkcreditcardleports: string;
}

/**
 * 소개 정보 숙박 (32)
 *
 */
export interface TourIntroductionAccomodation {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 굿스테이여부 */
	goodstay: string;
	/** 베니키아여부 */
	benikia: string;
	/** 한옥여부 */
	hanok: string;
	/** 객실수 */
	roomcount: string;
	/** 객실유형 */
	roomtype: string;
	/** 환불규정 */
	refundregulation: string;
	/** 입실시간 */
	checkintime: string;
	/** 퇴실시간 */
	checkouttime: string;
	/** 객실내취사여부 */
	chkcooking: string;
	/** 세미나실여부 */
	seminar: string;
	/** 스포츠시설여부 */
	sports: string;
	/** 사우나실여부 */
	sauna: string;
	/** 뷰티시설정보 */
	beauty: string;
	/** 식음료장여부 */
	beverage: string;
	/** 노래방여부 */
	karaoke: string;
	/** 바비큐장여부 */
	barbecue: string;
	/** 캠프파이어여부 */
	campfire: string;
	/** 자전거대여여부 */
	bicycle: string;
	/** 휘트니스센터여부 */
	fitness: string;
	/** 공용 PC실여부 */
	publicpc: string;
	/** 공용샤워실여부 */
	publicbath: string;
	/** 부대시설 (기타) */
	subfacility: string;
	/** 식음료장 */
	foodplace: string;
	/** 예약안내홈페이지 */
	reservationurl: string;
	/** 픽업서비스 */
	pickup: string;
	/** 문의및안내 */
	infocenterlodging: string;
	/** 주차시설 */
	parkinglodging: string;
	/** 예약안내 */
	reservationlodging: string;
	/** 규모 */
	scalelodging: string;
	/** 수용가능인원 */
	accomcountlodging: string;
}

/**
 * 소개 정보 쇼핑 (38)
 *
 */
export interface TourIntroductionShopping {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 판매품목 */
	saleitem: string;
	/** 판매품목별가격 */
	saleitemcost: string;
	/** 장서는날 */
	fairday: string;
	/** 개장일 */
	opendateshopping: string;
	/** 매장안내 */
	shopguide: string;
	/** 문화센터바로가기 */
	culturecenter: string;
	/** 화장실설명 */
	restroom: string;
	/** 문의및안내 */
	infocentershopping: string;
	/** 규모 */
	scaleshopping: string;
	/** 쉬는날 */
	restdateshopping: string;
	/** 주차시설 */
	parkingshopping: string;
	/** 유모차대여정보 */
	chkbabycarriageshopping: string;
	/** 애완동물동반가능정보 */
	chkpetshopping: string;
	/** 신용카드가능정보 */
	chkcreditcardshopping: string;
	/** 영업시간 */
	opentime: string;
}

/**
 * 소개 정보 음식점 (39)
 *
 */
export interface TourIntroductionRestaurant {
	/** 콘텐츠ID */
	contentid: string;
	/** 콘텐츠타입ID */
	contenttypeid: string;
	/** 좌석수 */
	seat: string;
	/** 어린이놀이방여부 */
	kidsfacility: string;
	/** 대표메뉴 */
	firstmenu: string;
	/** 취급메뉴 */
	treatmenu: string;
	/** 금연/흡연여부 */
	smoking: string;
	/** 문의및안내 */
	infocenterfood: string;
	/** 규모 */
	scalefood: string;
	/** 주차시설 */
	parkingfood: string;
	/** 개업일 */
	opendatefood: string;
	/** 영업시간 */
	opentimefood: string;
	/** 할인정보 */
	discountinfofood: string;
	/** 신용카드가능정보 */
	chkcreditcardfood: string;
	/** 예약안내 */
	reservationfood: string;
	/** 인허가번호 */
	lcnsno: string;
}
