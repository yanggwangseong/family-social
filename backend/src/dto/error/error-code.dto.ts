import { HttpStatus } from '@nestjs/common';

class ErrorCodeDTO {
	constructor(
		readonly status: number,
		readonly message: string,
	) {}
}
export type ErrorCode = ErrorCodeDTO;

// 404
export const ENTITY_NOT_FOUND = new ErrorCodeDTO(
	HttpStatus.NOT_FOUND,
	'Entity Not Found',
);

// 400
export const INVALID_REQUEST_BODY = new ErrorCodeDTO(
	HttpStatus.BAD_REQUEST,
	'RequestBody is invalid',
);

// 409
export const ENTITY_CONFLICT = new ErrorCodeDTO(
	HttpStatus.CONFLICT,
	'Entity is CONFLICT',
);
