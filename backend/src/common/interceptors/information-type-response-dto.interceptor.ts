import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { z } from 'zod';

import { ERROR_INTERNAL_SERVER_ERROR } from '@/constants/business-error';
import {
	TOUR_INFORMATION_TYPE_KEY,
	TourInformationEnum,
} from '@/constants/tour-information-type.const';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { AdditionalAccommodationResDto } from '@/models/dto/tour/res/additional-explanation/additional-accommodation-res.dto';
import { AdditionalCommonResDto } from '@/models/dto/tour/res/additional-explanation/addtional-common-res.dto';
import { AdditionalTravelCourseResDto } from '@/models/dto/tour/res/additional-explanation/addtional-travel-course-res.dto';
import { TourHttpAccommodationResDto } from '@/models/dto/tour/res/introduction/tour-http-accommodation-res.dto';
import { TourHttpCulturalResDto } from '@/models/dto/tour/res/introduction/tour-http-cultural-res.dto';
import { TourHttpFestivalResDto } from '@/models/dto/tour/res/introduction/tour-http-festival-res.dto';
import { TourHttpLeisureResDto } from '@/models/dto/tour/res/introduction/tour-http-leisure-res.dto';
import { TourHttpRestaurantResDto } from '@/models/dto/tour/res/introduction/tour-http-restaurant-res.dto';
import { TourHttpShoppingResDto } from '@/models/dto/tour/res/introduction/tour-http-shopping-res.dto';
import { TourHttpTouristResDto } from '@/models/dto/tour/res/introduction/tour-http-tourist-res.dto';
import { TourHttpTravelCourseResDto } from '@/models/dto/tour/res/introduction/tour-http-travel-course-res.dto';
import { TourContentTypeId } from '@/types/type';

import { InternalServerErrorException } from '../exception/service.exception';

@Injectable()
export class InformationTypeResponseDtoInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}
	intercept(context: ExecutionContext, next: CallHandler<any>) {
		const informationType: TourInformationEnum =
			this.reflector.getAllAndOverride(TOUR_INFORMATION_TYPE_KEY, [
				context.getHandler(),
				context.getClass,
			]);

		const schema = z.nativeEnum(TourInformationEnum);

		const validationResult = schema.safeParse(informationType);

		if (!informationType) {
			throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		}

		if (validationResult.success === false) {
			throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		}

		const req = context.switchToHttp().getRequest();

		const { contentTypeId }: { contentTypeId: TourContentTypeId } = req.query;

		return next
			.handle()
			.pipe(
				map((item) =>
					informationType === 'INTRO'
						? this.plainToInstanceIntroductionResponseDto(contentTypeId, item)
						: this.plainToInstanceAdditionalResponseDto(contentTypeId, item),
				),
			);
	}

	private plainToInstanceIntroductionResponseDto(
		contentTypeId: TourContentTypeId,
		item: any,
	) {
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
	}

	private plainToInstanceAdditionalResponseDto(
		contentTypeId: TourContentTypeId,
		item: any,
	) {
		switch (contentTypeId) {
			// 문화시설(14), 관광지(12), 축제공연행사(15), 28(레저), 38(쇼핑), 39(음식점)
			case '12':
			case '14':
			case '15':
			case '28':
			case '38':
			case '39':
				return plainToInstance(
					withBasicPaginationResponse(AdditionalCommonResDto),
					item,
				);

			case '25':
				return plainToInstance(
					withBasicPaginationResponse(AdditionalTravelCourseResDto),
					item,
				);

			case '32':
				return plainToInstance(
					withBasicPaginationResponse(AdditionalAccommodationResDto),
					item,
				);
		}
	}
}
