import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

import {
	ERROR_CANNOT_INVITE_SELF,
	ERROR_DELETE_GROUP,
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_DELETE_GROUP_SELF_ONLY_ADMIN,
	ERROR_DUPLICATE_GROUP_NAME,
	ERROR_GROUP_NOT_FOUND,
	ERROR_INVITED_GROUP_NOT_FOUND,
	ERROR_INVITED_MEMBER_NOT_FOUND,
	ERROR_NO_PERMISSION_TO_DELETE_GROUP,
	ERROR_NO_PERMISSTION_TO_GROUP,
	ERROR_USER_NOT_FOUND,
} from '@/constants/business-error';
import { FamResDto } from '@/models/dto/fam/res/fam-res.dto';
import { BelongToGroupResDto } from '@/models/dto/group/res/belong-to-group.res.dto';
import { GroupMembersResDto } from '@/models/dto/group/res/group-members.res.dto';
import { GroupResDto } from '@/models/dto/group/res/group-res.dto';

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
		ApiForbiddenResponse({
			description: `${ERROR_NO_PERMISSTION_TO_GROUP}`,
		}),
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
		ApiNotFoundResponse({
			description: ERROR_GROUP_NOT_FOUND,
		}),
		ApiConflictResponse({
			description: `1. ${ERROR_DELETE_GROUP_MEMBER} \n2. ${ERROR_DELETE_GROUP}`,
		}),
		ApiForbiddenResponse({
			description: `1. ${ERROR_NO_PERMISSION_TO_DELETE_GROUP} \n2. ${ERROR_DELETE_GROUP_SELF_ONLY_ADMIN}`,
		}),
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
		ApiConflictResponse({
			description: ERROR_DUPLICATE_GROUP_NAME,
		}),
		ApiNotFoundResponse({
			description: ERROR_GROUP_NOT_FOUND,
		}),
	);
};

export const CreateGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 생성',
		}),
		ApiCreatedResponse({
			description: '그룹 생성 성공',
			type: GroupResDto,
		}),
		ApiConflictResponse({
			description: ERROR_DUPLICATE_GROUP_NAME,
		}),
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
		ApiNotFoundResponse({
			description: `1. ${ERROR_GROUP_NOT_FOUND} \n2. ${ERROR_USER_NOT_FOUND}`,
		}),
		ApiBadRequestResponse({
			description: ERROR_CANNOT_INVITE_SELF,
		}),
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

export const UpdateFamInvitationAcceptSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 초대 수락 하기',
		}),
		ApiOkResponse({
			description: '그룹 초대 수락 성공',
			type: FamResDto,
		}),
		ApiNotFoundResponse({
			description: ERROR_INVITED_GROUP_NOT_FOUND,
		}),
		ApiBadRequestResponse({
			description: ERROR_INVITED_MEMBER_NOT_FOUND,
		}),
	);
};

export const DeleteFamByMemberOfGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 멤버 삭제',
		}),
		ApiOkResponse({
			description: '그룹 멤버 삭제 성공',
			type: FamResDto,
		}),
		ApiNotFoundResponse({
			description: ERROR_INVITED_GROUP_NOT_FOUND,
		}),
		ApiConflictResponse({
			description: ERROR_DELETE_GROUP_MEMBER,
		}),
	);
};
