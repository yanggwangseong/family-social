import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UsersResDto {
	@ApiProperty()
	@Transform(
		({ value }: { value: Date }) => {
			console.log('*******호출!!!******');
			return value.toISOString();
		},
		{
			toPlainOnly: true, // response 할때만 호출
		},
	)
	createdAt!: Date;
}
