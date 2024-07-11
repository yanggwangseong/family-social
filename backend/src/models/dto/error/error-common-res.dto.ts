import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionResponse {
	@ApiProperty({ type: Boolean, description: '성공여부' })
	success!: boolean;

	@ApiProperty({ type: String, description: '날짜시간' })
	timestamp!: string;

	@ApiProperty({ type: Number, description: '상태코드' })
	status!: number;

	@ApiProperty({ type: String, description: '에러 메세지' })
	message!: string;

	@ApiProperty({ type: String, description: '경로' })
	path!: string;
}
