import { OmitType } from '@nestjs/swagger';

import { GroupEventCreateReqDto } from './group-event-create-req.dto';

export class GroupEventUpdateReaDto extends OmitType(GroupEventCreateReqDto, [
	'eventGroupId',
]) {}
