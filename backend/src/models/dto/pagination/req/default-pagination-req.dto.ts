import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { numberValidationMessage } from '@/common/validation-message/number-validation-message';
import { OrderOptions, Union } from '@/types';

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

	@IsOptional()
	@IsIn([...OrderOptions], { message: isInValidationMessage })
	order__createdAt: Union<typeof OrderOptions> = 'DESC';
}
