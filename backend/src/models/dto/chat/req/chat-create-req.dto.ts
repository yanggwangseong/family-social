import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ChatCreateReqDto {
	@ApiProperty()
	@IsUUID(4, { each: true })
	memberIds!: string[];
}
