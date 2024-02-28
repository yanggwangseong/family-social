import { ApiProperty } from '@nestjs/swagger';

import { MessagesByChatResDto } from './messages-by-chat-res.dto';

export class GetMessagesListResDto {
	@ApiProperty({
		nullable: false,
		type: [MessagesByChatResDto],
	})
	list!: MessagesByChatResDto[];
}
