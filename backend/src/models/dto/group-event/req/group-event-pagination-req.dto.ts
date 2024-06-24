import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';
import { OrderOptions, Union } from '@/types';

import { DefaultPaginationReqDto } from '../../pagination/req/default-pagination-req.dto';

export class GroupEventPaginationReqDto extends DefaultPaginationReqDto {
	@ApiProperty({
		enum: OrderOptions,
		nullable: false,
	})
	@IsIn([...OrderOptions], { message: isInValidationMessage })
	order__eventStartDate: Union<typeof OrderOptions> = 'ASC';

	@ApiProperty({
		nullable: false,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	where__eventStartDate__more_than_or_equal!: string;
}
