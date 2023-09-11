import {
	Body,
	Controller,
	Delete,
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
	CreateFamByMemberOfGroupSwagger,
	CreateGroupSwagger,
	DeleteGroupSwagger,
	UpdateGroupMemberInvitationAcceptSwagger,
	UpdateGroupSwagger,
} from '@/common/decorators/swagger/swagger-group.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AcceptInvitationUpdateReqDto } from '@/dto/group/req/accept-invitation-update-req.dto';
import { GroupUpdateReqDto } from '@/dto/group/req/group-update-req.dto';
import { FamsService } from '../fams/fams.service';
import { MembersService } from '../members/members.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
	constructor(
		private readonly groupsService: GroupsService,
		private readonly famsService: FamsService,
		private readonly membersService: MembersService,
	) {}

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
	 * @summary 그룹 정보 수정
	 *
	 * @tag groups
	 * @param groupName string
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 그룹명
	 */
	@UpdateGroupSwagger()
	@Put(':groupId')
	async updateGroup(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@CurrentUser('sub') sub: string,
		@Body() dto: GroupUpdateReqDto,
	) {
		return await this.groupsService.updateGroup({
			groupId: groupId,
			groupName: dto.groupName,
			memberId: sub,
		});
	}

	/**
	 * @summary 그룹 삭제
	 *
	 * @tag groups
	 * @param groupId string
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@DeleteGroupSwagger()
	@Delete(':groupId')
	async deleteGroup(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@CurrentUser('sub') sub: string,
	) {
		return await this.groupsService.deleteGroup({
			groupId: groupId,
			memberId: sub,
		});
	}

	/**
	 * @summary 특정 그룹의 특정 멤버의 fam 생성
	 *
	 * @tag groups
	 * @param memberId string
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@CreateFamByMemberOfGroupSwagger()
	@Post('/:groupId/members/:memberId/fams')
	async CreateFamByMemberOfGroup(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Param('memberId', ParseUUIDPipe) memberId: string,
	) {
		// 그룹 체크
		await this.groupsService.findGroupByIdOrThrow(groupId);
		// 멤버 체크
		await this.membersService.findMemberByIdOrThrow(memberId);

		await this.famsService.CreateFamByMemberOfGroup({
			memberId: memberId,
			groupId: groupId,
		});
	}

	/**
	 * @summary 자신에게 온 그룹 초대 수락하기
	 *
	 * @tag groups
	 * @param sub 로그인 인증된 멤버 아이디
	 * @param famId 대상이 되는 fam 테이블의 레코드 아이디
	 * @param invitationAccepted 초대 수락 여/부
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 그룹에 초대된 멤버
	 */
	@UpdateGroupMemberInvitationAcceptSwagger()
	@Put('/:groupId/members/:memberId/fams/:famId/accept-invitation')
	async groupMemberInvitationAccept(
		@CurrentUser('sub') sub: string,
		@Param('famId', ParseUUIDPipe) famId: string,
		@Body() dto: AcceptInvitationUpdateReqDto,
	) {
		await this.groupsService.groupMemberInvitationAccept({
			memberId: sub,
			famId: famId,
			invitationAccepted: dto.invitationAccepted,
		});
	}

	/**
	 * @summary 특정 그룹의 특정 멤버의 fam 삭제
	 *
	 * @tag groups
	 * @param sub 로그인 인증된 멤버 아이디
	 * @param groupId 그룹 아이디
	 * @param memberId  대상이 되는 멤버 아이디
	 * @param famId  대상이 되는 fam 테이블의 레코드 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@Delete('/:groupId/members/:memberId/fams/:famId')
	async groupMemberDelete(
		@CurrentUser('sub') sub: string,
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Param('memberId', ParseUUIDPipe) memberId: string,
		@Param('famId', ParseUUIDPipe) famId: string,
	) {
		await this.groupsService.groupMemberDelete({
			groupId: groupId,
			memberId: memberId,
			famId: famId,
			ownMemberId: sub,
		});
	}
}
