import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { numberValidationMessage } from '@/common/validation-message/number-validation-message';

export class DefaultPaginationReqDto {
	@IsOptional()
	@Type(() => Number)
	@IsNumber(
		{},
		{
			message: numberValidationMessage,
		},
	)
	page: number = 1;

	@IsOptional()
	@Type(() => Number)
	@IsNumber(
		{},
		{
			message: numberValidationMessage,
		},
	)
	limit: number = 3;
}
