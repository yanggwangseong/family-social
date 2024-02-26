import { IsUUID } from 'class-validator';

export class ChatEnterReqDto {
	@IsUUID(4, { each: true })
	chatIds!: string[];
}
