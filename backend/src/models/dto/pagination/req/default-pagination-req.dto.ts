import { IsNumber, IsOptional } from 'class-validator';

import { numberValidationMessage } from '@/common/validation-message/number-validation-message';

export class DefaultPaginationReqDto {
	@IsOptional()
	@IsNumber(
		{},
		{
			message: numberValidationMessage,
		},
	)
	page: number = 1;

	@IsOptional()
	@IsNumber(
		{},
		{
			message: numberValidationMessage,
		},
	)
	limit: number = 3;
}
