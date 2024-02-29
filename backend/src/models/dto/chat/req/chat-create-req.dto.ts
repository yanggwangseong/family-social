import { IsUUID } from 'class-validator';

export class ChatCreateReqDto {
	@IsUUID(4, { each: true })
	memberIds!: string[];
}
