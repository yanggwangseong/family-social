import { MessageCreateReqDto } from '@/models/dto/message/req/message-create-req.dto';

export interface ICreateMessageArgs extends MessageCreateReqDto {
	memberId: string;
}
