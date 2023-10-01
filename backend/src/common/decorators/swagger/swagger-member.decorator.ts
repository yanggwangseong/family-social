import {
	ERROR_PASSWORD_MISMATCH,
	ERROR_EMAIL_NOT_FOUND,
	ERROR_USER_NOT_FOUND,
	ERROR_USER_ALREADY_EXISTS,
	ERROR_EMAIL_VERIFY_CODE_EXISTS,
} from '@/constants/business-error';
import { MemberResDto } from '@/dto/member/res/member-res.dto';
import { VerifyEmailResDto } from '@/dto/member/res/verify-email-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
} from '@nestjs/swagger';

export const LoginMemberSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 로그인',
		}),
		ApiOkResponse({
			description: '멤버 로그인 성공',
		}),
		ApiConflictResponse({
			description: ERROR_PASSWORD_MISMATCH,
		}),
		ApiNotFoundResponse({
			description: ERROR_EMAIL_NOT_FOUND,
		}),
	);
};

export const CreateMemberSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 생성',
		}),
		ApiCreatedResponse({
			description: '멤버 생성 성공',
			type: MemberResDto,
		}),
		ApiConflictResponse({
			description: ERROR_USER_ALREADY_EXISTS,
		}),
		ApiNotFoundResponse({
			description: ERROR_USER_NOT_FOUND,
		}),
	);
};

export const VerifyEmailSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '이메일 인증코드 검증',
		}),
		ApiOkResponse({
			description: '이메일 인증 성공',
			type: VerifyEmailResDto,
		}),
		ApiConflictResponse({
			description: ERROR_EMAIL_VERIFY_CODE_EXISTS,
		}),
		ApiNotFoundResponse({
			description: ERROR_EMAIL_NOT_FOUND,
		}),
	);
};
