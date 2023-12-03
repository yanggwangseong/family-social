import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { GroupsService } from './groups.service';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { GroupCreateReqDto } from '@/models/dto/group/req/group-create-req.dto';
import { ApiTags } from '@nestjs/swagger';
import {
	CreateFamByMemberOfGroupSwagger,
	CreateGroupSwagger,
	DeleteFamByMemberOfGroupSwagger,
	DeleteGroupSwagger,
	GetMemberBelongToGroupsSwagger,
	GetMemberListBelongToGroupSwagger,
	UpdateFamInvitationAcceptSwagger,
	UpdateGroupSwagger,
} from '@/common/decorators/swagger/swagger-group.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { GroupUpdateReqDto } from '@/models/dto/group/req/group-update-req.dto';
import { FamsService } from '../fams/fams.service';
import { MembersService } from '../members/members.service';
import {
	BadRequestServiceException,
	EntityConflictException,
} from '@/common/exception/service.exception';
import { AcceptInvitationUpdateReqDto } from '@/models/dto/fam/req/accept-invitation-update-req.dto';
import {
	ERROR_CANNOT_INVITE_SELF,
	ERROR_INVITED_MEMBER_NOT_FOUND,
} from '@/constants/business-error';
import { SchedulesService } from '../schedules/schedules.service';
import { TourismPeriodCreateReqDto } from '@/models/dto/schedule/req/tourism-period-create-req.dto';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
	constructor(
		private readonly groupsService: GroupsService,
		private readonly famsService: FamsService,
		private readonly membersService: MembersService,
		private readonly schedulesService: SchedulesService,
	) {}

	/**
	 * @summary 유저가 속한 모든 그룹 가져오기
	 *
	 * @tag groups
	 * @param {string} sub - 인증된 유저 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 그룹명
	 */
	@GetMemberBelongToGroupsSwagger()
	@Get()
	async getMemberBelongToGroups(@CurrentUser('sub') sub: string) {
		return await this.groupsService.getMemberBelongToGroups(sub);
	}

	// [TODO]: : [Get] groupId에 해당하는 그룹정보 가져오기

	/**
	 * @summary 유저가 속하는 Group생성
	 *
	 * @tag groups
	 * @param {string} dto.groupName - 그룹 이름
	 * @param {string} dto.groupDescription - 그룹 설명
	 * @param {string} sub - 인증된 유저 아이디
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
			groupDescription: dto.groupDescription,
		});
	}

	/**
	 * @summary 그룹 정보 수정
	 *
	 * @tag groups
	 * @param {string} dto.groupName - 그룹 이름
	 * @param {string} dto.groupDescription - 그룹 설명
	 * @param {string} groupId - 수정 할 그룹 아이디
	 * @param {string} sub - 인증된 유저 아이디
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
			groupDescription: dto.groupDescription,
			memberId: sub,
		});
	}

	/**
	 * @summary 그룹 삭제
	 *
	 * @tag groups
	 * @param {string} groupId - 삭제 할 그룹 아이디
	 * @param {string} sub - 인증된 유저 아이디
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
	 * @summary 유저가 속한 특정 그룹의 멤버 리스트 가져오기
	 *
	 * @tag groups
	 * @param {string} sub 		- 인증된 유저 아이디
	 * @param {string} groupId 	- 특정 그룹 아이디
	 * @param {number} page 	- 페이징을 위한 page 번호
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 그룹명
	 */
	@GetMemberListBelongToGroupSwagger()
	@Get('/:groupId/members')
	async getMemberListBelongToGroup(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Query('page') page: number,
		@CurrentUser('sub') sub: string,
	) {
		const limit = 10;
		return await this.groupsService.getMemberListBelongToGroup({
			groupId,
			memberId: sub,
			page,
			limit,
		});
	}

	/**
	 * @summary 특정 그룹의 특정 멤버의 fam 생성
	 *
	 * @tag groups
	 * @param {string} sub - 인증된 유저 아이디
	 * @param {string} memberId - 초대받은 특정 멤버의 아이디
	 * @param {string} groupId - 초대받은 그룹 아이디
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
			throw BadRequestServiceException(ERROR_CANNOT_INVITE_SELF);
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
	 * @param {string} sub - 인증된 유저 아이디
	 * @param {string} groupId - 초대받은 그룹 아이디
	 * @param {string} memberId - 초대받은 멤버 아이디
	 * @param {string} famId - 대상이 되는 fam 테이블의 레코드 아이디
	 * @param {boolean} dto.invitationAccepted - 초대 수락 여/부
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@UpdateFamInvitationAcceptSwagger()
	@Put('/:groupId/members/:memberId/fams/:famId/accept-invitation')
	async updateFamInvitationAccept(
		@CurrentUser('sub') sub: string,
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Param('memberId', ParseUUIDPipe) memberId: string,
		@Param('famId', ParseUUIDPipe) famId: string,
		@Body() dto: AcceptInvitationUpdateReqDto,
	) {
		//초대 받은 멤버와 인증된 멤버와 같은지 체크
		if (sub !== memberId) {
			throw BadRequestServiceException(ERROR_INVITED_MEMBER_NOT_FOUND);
		}

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
	 * @param {string} groupId 		- 그룹 아이디
	 * @param {string} memberId  	- 대상이 되는 멤버 아이디
	 * @param {string} famId  		- 대상이 되는 fam 테이블의 레코드 아이디
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

	// groups/:groupId/schedules				[post]		일정 생성
	// groups/:groupId/schedules/:scheduleId	[put]		일정 수정
	// groups/:groupId/schedules/:scheduleId	[delete]	일정삭제
	@Post('/:groupId/schedules')
	async createToursSchedule(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@CurrentUser('sub') sub: string,
		@Body() dto: TourismPeriodCreateReqDto[],
	) {
		return await this.schedulesService.createToursSchedule({
			memberId: sub,
			groupId,
			periods: dto,
		});
	}

	@Put('/:groupId/schedules/:scheduleId')
	async updateToursSchedule(
		@Param('groupId', ParseUUIDPipe) groupId: string,
		@Param('scheduleId', ParseUUIDPipe) scheduleId: string,
		@CurrentUser('sub') sub: string,
		@Body() dto: any,
	) {
		return await this.schedulesService.updateToursSchedule({
			memberId: sub,
			groupId,
			scheduleId: scheduleId,
		});
	}
}
