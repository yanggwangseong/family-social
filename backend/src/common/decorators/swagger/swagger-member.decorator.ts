import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import { MemberErrorResponse } from '@/constants/swagger-error-response';
import { MemberAccountResDto } from '@/models/dto/member/res/member-account-res.dto';
import { MemberProfileImageResDto } from '@/models/dto/member/res/member-profile-image-res.dto';
import { MemberSearchResDto } from '@/models/dto/member/res/member-search-res.dto';
import { VerifyEmailResDto } from '@/models/dto/member/res/verify-email-res.dto';

import { ErrorResponse } from './error-response.decorator';
import { SuccessResponse } from './sucess-response.decorator';

export const LoginMemberSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 로그인',
		}),
		ApiOkResponse({
			description: '멤버 로그인 성공',
		}),

		ErrorResponse(HttpStatus.UNAUTHORIZED, [
			MemberErrorResponse['Member-401-1'],
		]),
		ErrorResponse(HttpStatus.NOT_FOUND, [MemberErrorResponse['Member-404-2']]),
	);
};

export const CreateMemberSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '멤버 생성',
		}),

		SuccessResponse(HttpStatus.CREATED, [
			{
				model: MemberProfileImageResDto,
				exampleTitle: '멤버 생성',
				exampleDescription: '멤버 생성 성공',
			},
		]),

		ErrorResponse(HttpStatus.CONFLICT, [MemberErrorResponse['Member-409-1']]),
		ErrorResponse(HttpStatus.NOT_FOUND, [MemberErrorResponse['Member-404-1']]),
	);
};

export const PatchSocialSignUpMemberSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '소셜 회원가입',
		}),
		ApiCreatedResponse({
			description: '소셜 회원가입 성공',
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
		ErrorResponse(HttpStatus.UNAUTHORIZED, [
			MemberErrorResponse['Member-401-2'],
		]),
	);
};

export const VerifyEmailSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '이메일 인증코드 검증',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: VerifyEmailResDto,
				exampleTitle: '이메일 인증',
				exampleDescription: '이메일 인증 성공',
			},
		]),
		ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, [
			MemberErrorResponse['Member-422-1'],
		]),

		ErrorResponse(HttpStatus.NOT_FOUND, [MemberErrorResponse['Member-404-2']]),
	);
};

export const GetMembersByUserNameSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '유저이름에 해당하는 유저 리스트 검색',
		}),
		ApiOkResponse({
			description: '유저이름에 해당하는 유저 리스트 검색',
			type: MemberSearchResDto,
			isArray: true,
		}),
	);
};

export const GetMembersSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '내가 속한 그룹의 멤버들 전체 가져오기',
		}),
		ApiOkResponse({
			description: '내가 속한 그룹의 멤버들 전체 가져오기',
			type: MemberSearchResDto,
			isArray: true,
		}),
	);
};

export const GetMemberByMemberIdSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 멤버 유저 아이디로 조회',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: MemberProfileImageResDto,
				exampleTitle: '멤버 아이디 조회',
				exampleDescription: '특정 멤버 유저 아이디로 조회 성공',
			},
		]),

		ErrorResponse(HttpStatus.NOT_FOUND, [MemberErrorResponse['Member-404-1']]),
	);
};

export const GetMemberByEmailSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 멤버 유저 이메일로 조회',
		}),
		SuccessResponse(HttpStatus.OK, [
			{
				model: MemberAccountResDto,
				exampleTitle: '멤버 이메일 조회',
				exampleDescription: '특정 멤버 유저 이메일로 조회 성공',
			},
		]),

		ErrorResponse(HttpStatus.NOT_FOUND, [MemberErrorResponse['Member-404-1']]),
	);
};
