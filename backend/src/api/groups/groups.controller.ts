import {
	Body,
	Controller,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { GroupsService } from './groups.service';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { GroupCreateReqDto } from '@/dto/group/req/group-create-req.dto';
import { ApiTags } from '@nestjs/swagger';
import {
	CreateGroupSwagger,
	CreateMemberByGroupSwagger,
	UpdateGroupMemberInvitationAcceptSwagger,
} from '@/common/decorators/swagger/swagger-group.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { GroupMemberCreateReqDto } from '@/dto/group/req/group-member-create-req.dto';
import { AcceptInvitationUpdateReqDto } from '@/dto/group/req/accept-invitation-update-req.dto';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) {}

	/**
	 * @summary 유저가 속하는 Group생성
	 *
	 * @tag groups
	 * @param groupName string
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 그룹명
	 */
	@CreateGroupSwagger()
	@Post()
	async createGroup(
		@Body() dto: GroupCreateReqDto,
		@CurrentUser('sub') sub: string,
	) {
		return await this.groupsService.createGroup({
			memberId: sub,
			groupName: dto.groupName,
		});
	}

	/**
	 * @summary Group 멤버 생성
	 *
	 * @tag groups
	 * @param memberId string
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 그룹에 초대된 멤버
	 */
	@CreateMemberByGroupSwagger()
	@Post(':groupId/members')
	async createMemberByGroup(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Body() dto: GroupMemberCreateReqDto,
	) {
		await this.groupsService.createMemberByGroup({
			memberId: dto.memberId,
			groupId: groupId,
		});
	}

	/**
	 * @summary 자신에게 온 그룹 초대 수락하기
	 *
	 * @tag groups
	 * @param memberGroupId string
	 * @param invitationAccepted boolean
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 그룹에 초대된 멤버
	 */
	@UpdateGroupMemberInvitationAcceptSwagger()
	@Put('/accept-invitation')
	async groupMemberInvitationAccept(
		@CurrentUser('sub') sub: string,
		@Body() dto: AcceptInvitationUpdateReqDto,
	) {
		await this.groupsService.groupMemberInvitationAccept({
			memberId: sub,
			memberGroupId: dto.memberGroupId,
			invitationAccepted: dto.invitationAccepted,
		});
	}
}
