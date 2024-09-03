import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import {
	BadRequestErrorResponse,
	GroupErrorResponse,
	MemberErrorResponse,
} from '@/constants/swagger-error-response';
import { FamResDto } from '@/models/dto/fam/res/fam-res.dto';
import { BelongToGroupResDto } from '@/models/dto/group/res/belong-to-group.res.dto';
import { GroupMembersResDto } from '@/models/dto/group/res/group-members.res.dto';
import { GroupResDto } from '@/models/dto/group/res/group-res.dto';

import { ErrorResponse } from './error-response.decorator';
import { SuccessResponse } from './sucess-response.decorator';

export const GetMemberListBelongToGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '유저가 속한 특정 그룹의 멤버 리스트 가져오기',
		}),
		ApiOkResponse({
			description: '그룹의 멤버 리스트 가져오기',
			type: GroupMembersResDto,
			isArray: true,
		}),
		ErrorResponse(HttpStatus.FORBIDDEN, [GroupErrorResponse['Group-403-1']]),
	);
};

export const GetMemberBelongToGroupsSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '유저가 속한 모든 그룹 가져오기',
		}),
		ApiOkResponse({
			description: '그룹 가져오기',
			type: BelongToGroupResDto,
			isArray: true,
		}),
	);
};

export const DeleteGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹 삭제',
		}),
		ApiOkResponse({
			description: '그룹 삭제 성공',
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-1']]),

		ErrorResponse(HttpStatus.CONFLICT, [
			GroupErrorResponse['Group-409-2'],
			GroupErrorResponse['Group-409-3'],
		]),

		ErrorResponse(HttpStatus.FORBIDDEN, [
			GroupErrorResponse['Group-403-2'],
			GroupErrorResponse['Group-403-3'],
		]),
	);
};

export const UpdateGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 정보 수정',
		}),
		ApiOkResponse({
			description: '그룹 정보 수정 성공',
			type: GroupResDto,
		}),

		ErrorResponse(HttpStatus.CONFLICT, [GroupErrorResponse['Group-409-1']]),
		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-1']]),
	);
};

export const CreateGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 생성',
		}),

		SuccessResponse(HttpStatus.CREATED, [
			{
				model: GroupResDto,
				exampleTitle: '그룹 생성',
				exampleDescription: '그룹 생성 성공',
			},
		]),

		ErrorResponse(HttpStatus.CONFLICT, [GroupErrorResponse['Group-409-1']]),
	);
};

export const CreateFamByMemberOfGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 멤버 생성',
		}),
		ApiCreatedResponse({
			description: '그룹 멤버 생성 성공',
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			MemberErrorResponse['Member-404-1'],
		]),
		ErrorResponse(HttpStatus.BAD_REQUEST, [GroupErrorResponse['Group-400-1']]),
	);
};

export const PostInvitedEmailsOfGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹의 email 초대',
		}),
		ApiOkResponse({
			description: '특정 그룹의 email 초대',
		}),
	);
};

export const GetInviteLinkByGroup = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹 초대 링크를 가져오기',
		}),
		ApiOkResponse({
			description: '특정 그룹 초대 링크를 가져오기',
			type: String,
		}),

		ErrorResponse(HttpStatus.NOT_FOUND, [
			GroupErrorResponse['Group-404-1'],
			BadRequestErrorResponse['BadRequest-400-1'],
		]),
	);
};

export const UpdateFamInvitationAcceptSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 초대 수락 하기',
		}),
		SuccessResponse(HttpStatus.OK, [
			{
				model: FamResDto,
				exampleTitle: '그룹 초대 수락',
				exampleDescription: '그룹 초대 수락 성공',
			},
		]),

		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-2']]),
		ErrorResponse(HttpStatus.BAD_REQUEST, [GroupErrorResponse['Group-400-2']]),
	);
};

export const DeleteFamByMemberOfGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 멤버 삭제',
		}),

		SuccessResponse(HttpStatus.OK, [
			{
				model: FamResDto,
				exampleTitle: '그룹 멤버 삭제',
				exampleDescription: '그룹 멤버 삭제 성공',
			},
		]),

		ErrorResponse(HttpStatus.NOT_FOUND, [GroupErrorResponse['Group-404-2']]),

		ErrorResponse(HttpStatus.CONFLICT, [GroupErrorResponse['Group-409-3']]),
	);
};
