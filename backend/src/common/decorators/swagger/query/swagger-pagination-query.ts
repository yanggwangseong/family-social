import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const PagiNationQuerySwagger = () => {
	return applyDecorators(
		ApiQuery({
			name: 'page',
			required: false,
			type: Number,
			description: '페이지 번호',
			example: 1,
		}),
		ApiQuery({
			name: 'limit',
			required: false,
			type: Number,
			description: '가져 올 갯수',
			example: 10,
		}),
	);
};
