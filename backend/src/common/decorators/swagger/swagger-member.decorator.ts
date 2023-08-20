import { MemberResDto } from '@/dto/member/res/member-res.dto';
import { applyDecorators } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiResponse,
} from '@nestjs/swagger';

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
			description: '이미 멤버가 존재함',
		}),
		ApiNotFoundResponse({
			description: '생성한 유저를 찾을 수 없습니다.',
		}),
	);
};
