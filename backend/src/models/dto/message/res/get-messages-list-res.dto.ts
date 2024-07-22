import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { MessagesByChatResDto } from './messages-by-chat-res.dto';

export class GetMessagesListResDto {
	@ApiProperty({
		nullable: false,
		type: [MessagesByChatResDto],
	})
	@Type(() => MessagesByChatResDto)
	list!: MessagesByChatResDto[];
}
