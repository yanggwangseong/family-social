import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { TourHttpAccommodationResDto } from '@/models/dto/tour/res/tour-http-accommodation-res.dto';
import { TourHttpCulturalResDto } from '@/models/dto/tour/res/tour-http-cultural-res.dto';
import { TourHttpFestivalResDto } from '@/models/dto/tour/res/tour-http-festival-res.dto';
import { TourHttpLeisureResDto } from '@/models/dto/tour/res/tour-http-leisure-res.dto';
import { TourHttpRestaurantResDto } from '@/models/dto/tour/res/tour-http-restaurant-res.dto';
import { TourHttpShoppingResDto } from '@/models/dto/tour/res/tour-http-shopping-res.dto';
import { TourHttpTouristResDto } from '@/models/dto/tour/res/tour-http-tourist-res.dto';
import { TourHttpTravelCourseResDto } from '@/models/dto/tour/res/tour-http-travel-course-res.dto';
import { TourContentTypeId } from '@/types/type';

@Injectable()
export class CommonInformationResponseDtoInterceptor
	implements NestInterceptor
{
	intercept(context: ExecutionContext, next: CallHandler<any>) {
		const req = context.switchToHttp().getRequest();

		const { contentTypeId }: { contentTypeId: TourContentTypeId } = req.query;

		return next.handle().pipe(
			map((item) => {
				switch (contentTypeId) {
					case '12':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpTouristResDto),
							item,
						);

					case '14':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpCulturalResDto),
							item,
						);
					case '15':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpFestivalResDto),
							item,
						);
					case '25':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpTravelCourseResDto),
							item,
						);
					case '28':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpLeisureResDto),
							item,
						);
					case '32':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpAccommodationResDto),
							item,
						);
					case '38':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpShoppingResDto),
							item,
						);
					case '39':
						return plainToInstance(
							withBasicPaginationResponse(TourHttpRestaurantResDto),
							item,
						);
				}
			}),
		);
	}
}
