import { SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

import { RESPONSE_DTO_KEY } from '@/constants/response-dto.const';

export const IsResponseDtoDecorator = <T>(responseClass: ClassConstructor<T>) =>
	SetMetadata(RESPONSE_DTO_KEY, responseClass);
