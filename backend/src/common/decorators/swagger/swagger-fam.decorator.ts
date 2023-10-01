import { FamInvitationsResDto } from '@/dto/fam/res/fam-invitations-res.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const GetInvitationsListSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '수락하지 않은 팸 초대 리스트를 조회',
		}),
		ApiOkResponse({
			description: '팸 초대 리스트 조회 성공',
			type: FamInvitationsResDto,
			isArray: true,
		}),
	);
};
