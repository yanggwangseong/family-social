import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
	ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
	ERROR_PASSWORD_MISMATCH,
	ERROR_EMAIL_NOT_FOUND,
	ERROR_USER_NOT_FOUND,
	ERROR_USER_ALREADY_EXISTS,
	ERROR_EMAIL_VERIFY_CODE_EXISTS,
	ERROR_AUTHORIZATION_MEMBER,
} from '@/constants/business-error';
import { MemberResDto } from '@/models/dto/member/res/member-res.dto';
import { VerifyEmailResDto } from '@/models/dto/member/res/verify-email-res.dto';

export const LoginMemberSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 로그인',
		}),
		ApiOkResponse({
			description: '멤버 로그인 성공',
		}),
		ApiUnauthorizedResponse({
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

export const UpdateMemberProfileSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 프로필 수정',
		}),
		ApiCreatedResponse({
			description: '멤버 프로필 수정 성공',
		}),
		ApiUnauthorizedResponse({
			description: ERROR_AUTHORIZATION_MEMBER,
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
		ApiUnprocessableEntityResponse({
			description: ERROR_EMAIL_VERIFY_CODE_EXISTS,
		}),
		ApiNotFoundResponse({
			description: ERROR_EMAIL_NOT_FOUND,
		}),
	);
};
