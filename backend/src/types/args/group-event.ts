import { GroupEventCreateReqDto } from '@/models/dto/group-event/req/group-event-create-req.dto';
import { GroupEventUpdateReaDto } from '@/models/dto/group-event/req/group-event-update-req.dto';

export interface ICreateGroupEventArgs extends GroupEventCreateReqDto {}

export interface IUpdateGroupEventArgs extends GroupEventUpdateReaDto {
	groupEventId: string;
}
