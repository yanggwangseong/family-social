import { GroupResDto } from '@/dto/group/res/group-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
} from '@nestjs/swagger';

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

export const CreateMemberByGroupSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '그룹 멤버 생성',
		}),
		ApiCreatedResponse({
			description: '그룹 멤버 생성 성공',
		}),
		ApiNotFoundResponse({
			description: '그룹을 찾을 수 없습니다.',
		}),
	);
};
