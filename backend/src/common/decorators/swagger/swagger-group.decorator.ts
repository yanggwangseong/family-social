import { GroupResDto } from '@/dto/group/res/group-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
} from '@nestjs/swagger';

export const DeleteGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '특정 그룹 삭제',
		}),
		ApiCreatedResponse({
			description: '그룹 삭제 성공',
		}),
		ApiNotFoundResponse({
			description: '그룹을 찾을 수 없습니다.',
		}),
	);
};

export const UpdateGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 정보 수정',
		}),
		ApiCreatedResponse({
			description: '그룹 정보 수정 성공',
			type: GroupResDto,
		}),
		ApiConflictResponse({
			description: '중복된 그룹 이름을 이미 가지고 있습니다.',
		}),
		ApiNotFoundResponse({
			description: '그룹을 찾을 수 없습니다.',
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
			description: '중복된 그룹 이름을 이미 가지고 있습니다.',
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
			description: '1. 그룹을 찾을 수 없습니다. \n2. 유저를 찾을 수 없습니다.',
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
		ApiCreatedResponse({
			description: '그룹 초대 수락 성공',
		}),
		ApiNotFoundResponse({
			description: '초대 받은 그룹을 찾을 수 없습니다.',
		}),
	);
};