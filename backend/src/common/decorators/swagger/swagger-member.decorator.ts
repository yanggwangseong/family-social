import { MemberResDto } from '@/dto/member/res/member-res.dto';
import { VerifyEmailResDto } from '@/dto/member/res/verify-email-res.dto';
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

export const VerifyEmailSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '이메일 인증코드 검증',
		}),
		ApiCreatedResponse({
			description: '이메일 인증 성공',
			type: VerifyEmailResDto,
		}),
		ApiConflictResponse({
			description: '이메일 검증 코드가 일치 하지 않습니다',
		}),
		ApiNotFoundResponse({
			description: '이메일에 해당하는 유저를 찾을 수 없습니다.',
		}),
	);
};
