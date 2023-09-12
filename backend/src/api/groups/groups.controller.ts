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
	DeleteFamByMemberOfGroupSwagger,
	DeleteGroupSwagger,
	UpdateFamInvitationAcceptSwagger,
	UpdateGroupSwagger,
} from '@/common/decorators/swagger/swagger-group.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { GroupUpdateReqDto } from '@/dto/group/req/group-update-req.dto';
import { FamsService } from '../fams/fams.service';
import { MembersService } from '../members/members.service';
import { EntityConflictException } from '@/common/exception/service.exception';
import { AcceptInvitationUpdateReqDto } from '@/dto/fam/req/accept-invitation-update-req.dto';

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
	 * @param memberId 초대받은 특정 멤버의 아이디
	 * @param groupId 초대받은 그룹 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@CreateFamByMemberOfGroupSwagger()
	@Post('/:groupId/members/:memberId/fams')
	async createFamByMemberOfGroup(
		@CurrentUser('sub') sub: string,
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Param('memberId', ParseUUIDPipe) memberId: string,
	) {
		//자기 자신을 초대한지 체크
		if (sub === memberId) {
			throw EntityConflictException('자기 자신을 초대할 수 없습니다.');
		}
		// 그룹 체크
		await this.groupsService.findGroupByIdOrThrow(groupId);
		// 멤버 체크
		await this.membersService.findMemberByIdOrThrow(memberId);

		await this.famsService.createFamByMemberOfGroup({
			memberId: memberId,
			groupId: groupId,
		});
	}

	/**
	 * @summary 그룹 초대 수락하기
	 *
	 * @tag groups
	 * @param groupId 초대받은 그룹 아이디
	 * @param memberId 초대받은 멤버 아이디
	 * @param famId 대상이 되는 fam 테이블의 레코드 아이디
	 * @param invitationAccepted 초대 수락 여/부
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@UpdateFamInvitationAcceptSwagger()
	@Put('/:groupId/members/:memberId/fams/:famId/accept-invitation')
	async updateFamInvitationAccept(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Param('memberId', ParseUUIDPipe) memberId: string,
		@Param('famId', ParseUUIDPipe) famId: string,
		@Body() dto: AcceptInvitationUpdateReqDto,
	) {
		// 초대받은 유저인지 체크
		await this.famsService.checkIfFamExists({
			groupId: groupId,
			memberId: memberId,
			famId: famId,
		});

		return await this.famsService.updateFamInvitationAccept({
			groupId: groupId,
			memberId: memberId,
			famId: famId,
			invitationAccepted: dto.invitationAccepted,
		});
	}

	/**
	 * @summary 특정 그룹의 특정 멤버의 fam 삭제
	 *
	 * @tag groups
	 * @param groupId 그룹 아이디
	 * @param memberId  대상이 되는 멤버 아이디
	 * @param famId  대상이 되는 fam 테이블의 레코드 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@DeleteFamByMemberOfGroupSwagger()
	@Delete('/:groupId/members/:memberId/fams/:famId')
	async deleteFamByMemberOfGroup(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Param('memberId', ParseUUIDPipe) memberId: string,
		@Param('famId', ParseUUIDPipe) famId: string,
	) {
		// fam에 존재하는지 확인
		const fam = await this.famsService.checkIfFamExists({
			groupId: groupId,
			memberId: memberId,
			famId: famId,
		});

		await this.famsService.deleteFamByMemberOfGroup({
			groupId: groupId,
			memberId: memberId,
			famId: famId,
		});

		return fam;
	}
}
