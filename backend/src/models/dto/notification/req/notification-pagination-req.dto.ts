import { IsIn } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { Union, isReadOptions } from '@/types';

import { DefaultPaginationReqDto } from '../../pagination/req/default-pagination-req.dto';

export class NotificationPaginationReqDto extends DefaultPaginationReqDto {
	@IsIn(isReadOptions, { message: isInValidationMessage })
	is_read_options!: Union<typeof isReadOptions>;
}
