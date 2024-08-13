import { IsIn } from 'class-validator';

import { isInValidationMessage } from '@/common/validation-message/is-in-validation-message';
import { isScheduleOptins, Union } from '@/types';

import { DefaultPaginationReqDto } from '../../pagination/req/default-pagination-req.dto';

export class SchedulePaginationReqDto extends DefaultPaginationReqDto {
	@IsIn(isScheduleOptins, { message: isInValidationMessage })
	options!: Union<typeof isScheduleOptins>;
}
