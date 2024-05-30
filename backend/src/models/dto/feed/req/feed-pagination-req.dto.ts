import { IsIn, IsOptional, IsUUID } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';
import { Union, isFeedOptions } from '@/types';

import { DefaultPaginationReqDto } from '../../pagination/req/default-pagination-req.dto';

export class FeedPaginationReqDto extends DefaultPaginationReqDto {
	@IsIn(isFeedOptions, { message: isInValidationMessage })
	options!: Union<typeof isFeedOptions>;

	@IsOptional()
	@IsUUID(4, { message: uuidValidationMessage })
	groupId?: string;
}
