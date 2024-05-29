import { IsIn } from 'class-validator';

import { Union, isReadOptions } from '@/types';

import { DefaultPaginationReqDto } from '../../pagination/req/default-pagination-req.dto';

export class NotificationPaginationReqDto extends DefaultPaginationReqDto {
	@IsIn(isReadOptions)
	is_read_options!: Union<typeof isReadOptions>;
}
