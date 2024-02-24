import { IsUUID } from 'class-validator';

export class ChatCreateReqDto {
	@IsUUID()
	memberIds!: string[];
}
