import { TourHttpAccommodationResDto } from '@/models/dto/tour/res/tour-http-accommodation-res.dto';
import { TourHttpCulturalResDto } from '@/models/dto/tour/res/tour-http-cultural-res.dto';
import { TourHttpFestivalResDto } from '@/models/dto/tour/res/tour-http-festival-res.dto';
import { TourHttpLeisureResDto } from '@/models/dto/tour/res/tour-http-leisure-res.dto';
import { TourHttpRestaurantResDto } from '@/models/dto/tour/res/tour-http-restaurant-res.dto';
import { TourHttpShoppingResDto } from '@/models/dto/tour/res/tour-http-shopping-res.dto';
import { TourHttpTouristResDto } from '@/models/dto/tour/res/tour-http-tourist-res.dto';
import { TourHttpTravelCourseResDto } from '@/models/dto/tour/res/tour-http-travel-course-res.dto';

export type TourContentTypeId =
	| '12'
	| '14'
	| '15'
	| '25'
	| '28'
	| '32'
	| '38'
	| '39';

export type TourCommonInformationInterSactionType = TourHttpTouristResDto &
	TourHttpCulturalResDto &
	TourHttpFestivalResDto &
	TourHttpTravelCourseResDto &
	TourHttpLeisureResDto &
	TourHttpAccommodationResDto &
	TourHttpShoppingResDto &
	TourHttpRestaurantResDto;
