import {
	ERROR_DELETE_GROUP,
	ERROR_DELETE_GROUP_MEMBER,
	ERROR_DELETE_GROUP_SELF_ONLY_ADMIN,
	ERROR_DUPLICATE_GROUP_NAME,
	ERROR_GROUP_NOT_FOUND,
	ERROR_INVITED_GROUP_NOT_FOUND,
	ERROR_NO_PERMISSION_TO_DELETE_GROUP,
	ERROR_USER_NOT_FOUND,
} from '@/constants/business-error';
import { FamResDto } from '@/dto/fam/res/fam-res.dto';
import { GroupResDto } from '@/dto/group/res/group-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

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
			description: `1. ${ERROR_NO_PERMISSION_TO_DELETE_GROUP} \n2. ${ERROR_DELETE_GROUP_SELF_ONLY_ADMIN} \n3. ${ERROR_DELETE_GROUP}`,
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
		ApiConflictResponse({
			description: '자기 자신을 초대할 수 없습니다.',
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
		ApiConflictResponse({
			description: '초대받은 멤버와 다른 사용자 입니다.',
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
