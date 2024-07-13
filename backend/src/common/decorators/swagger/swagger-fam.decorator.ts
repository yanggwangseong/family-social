import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { FamInvitationsResDto } from '@/models/dto/fam/res/fam-invitations-res.dto';
import { withBasicPaginationResponse } from '@/models/dto/pagination/res/basic-pagination-res.dto';

import { SuccessResponse } from './sucess-response.decorator';

export const GetInvitationsListSwagger = () => {
	return applyDecorators(
		ApiOperation({
			summary: '수락하지 않은 팸 초대 리스트를 조회',
		}),
		// ApiOkResponse({
		// 	description: '팸 초대 리스트 조회 성공',
		// 	type: FamInvitationsResDto,
		// 	isArray: true,
		// }),
		SuccessResponse(HttpStatus.OK, [
			{
				model: withBasicPaginationResponse(FamInvitationsResDto),
				exampleTitle: '팸 초대 리스트 가져오기',
				exampleDescription: '수락하지 않은 팸 초대 리스트를 가져옵니다',
			},
		]),
	);
};
