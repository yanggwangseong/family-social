import { GroupResDto } from '@/dto/group/res/group-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
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
