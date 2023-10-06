import {
	ENTITY_CONFLICT,
	ENTITY_NOT_FOUND,
	ErrorCode,
	BAD_REQUEST,
	FORBIDDEN,
	UNAUTHORIZED,
	UNPROCESSABLE_ENTITY,
} from '@/models/dto/error/error-code.dto';

// UNAUTHORIZED SERVICE EXCEPTION
export const UnAuthOrizedException = (message?: string): ServiceException => {
	return new ServiceException(UNAUTHORIZED, message);
};

// FORBIDDEN SERVICE EXCEPTION
export const ForBiddenException = (message?: string): ServiceException => {
	return new ServiceException(FORBIDDEN, message);
};

// ENTITY NOT FOUND SERVICE EXCEPTION
export const EntityNotFoundException = (message?: string): ServiceException => {
	return new ServiceException(ENTITY_NOT_FOUND, message);
};

// BAD REQUEST SERVICE EXCEPTION
export const BadRequestServiceException = (
	message?: string,
): ServiceException => {
	return new ServiceException(BAD_REQUEST, message);
};

// CONFLICT SERVICE EXCEPTION
export const EntityConflictException = (message?: string): ServiceException => {
	return new ServiceException(ENTITY_CONFLICT, message);
};

// UNPROCESSABLE SERVICE EXCEPTION
export const UnProcessAbleException = (message?: string): ServiceException => {
	return new ServiceException(UNPROCESSABLE_ENTITY, message);
};

interface HttpExceptionResponse {
	readonly success: boolean;
	readonly timestamp: string;
	readonly status: number;
	readonly message: string;
	readonly path: string;
}

export class ServiceException extends Error {
	constructor(
		readonly errorCode: ErrorCode,
		message?: string,
	) {
		if (!message) {
			message = errorCode.message;
		}

		super(message);
	}

	toHttpExceptionResponse(path?: string): HttpExceptionResponse {
		return {
			success: false,
			timestamp: new Date().toISOString(),
			status: this.errorCode.status,
			message: this.message,
			path: path ?? '',
		};
	}
}
