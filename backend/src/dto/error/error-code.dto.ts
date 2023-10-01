import { HttpStatus } from '@nestjs/common';

class ErrorCodeDTO {
	constructor(
		readonly status: number,
		readonly message: string,
	) {}
}
export type ErrorCode = ErrorCodeDTO;

// 401
export const UNAUTHORIZED = new ErrorCodeDTO(
	HttpStatus.UNAUTHORIZED,
	'Unauthorized',
);

// 403
export const FORBIDDEN = new ErrorCodeDTO(HttpStatus.FORBIDDEN, 'Forbidden');

// 404
export const ENTITY_NOT_FOUND = new ErrorCodeDTO(
	HttpStatus.NOT_FOUND,
	'Entity Not Found',
);

// 400
export const BAD_REQUEST = new ErrorCodeDTO(
	HttpStatus.BAD_REQUEST,
	'Bad Request',
);

// 409
export const ENTITY_CONFLICT = new ErrorCodeDTO(
	HttpStatus.CONFLICT,
	'Entity is CONFLICT',
);
