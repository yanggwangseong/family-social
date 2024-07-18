import { SetMetadata } from '@nestjs/common';

import {
	TOUR_INFORMATION_TYPE_KEY,
	TourInformationEnum,
} from '@/constants/tour-information-type.const';

export const IsTourInformationType = (informationType: TourInformationEnum) =>
	SetMetadata(TOUR_INFORMATION_TYPE_KEY, informationType);
