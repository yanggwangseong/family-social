import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryRunner } from 'typeorm';

import { QueryRunnerDecorator } from '@/common/decorators/query-runner.decorator';
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
import {
	CreateToursScheduleSwagger,
	DeleteToursScheduleSwagger,
	GetOneScheduleSwagger,
	GetScheduleListSwagger,
	UpdateToursScheduleSwagger,
} from '@/common/decorators/swagger/swagger-schedule.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { BadRequestServiceException } from '@/common/exception/service.exception';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { GroupMemberShipGuard } from '@/common/guards/group-membership.guard';
import { IsMineScheduleGuard } from '@/common/guards/is-mine-schedule.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { TransactionInterceptor } from '@/common/interceptors/transaction.interceptor';
import { parseIntPipeMessage } from '@/common/pipe-message/parse-int-pipe-message';
import { parseUUIDPipeMessage } from '@/common/pipe-message/parse-uuid-pipe-message';
import {
	ERROR_CANNOT_INVITE_SELF,
	ERROR_INVITED_MEMBER_NOT_FOUND,
} from '@/constants/business-error';
import { AcceptInvitationUpdateReqDto } from '@/models/dto/fam/req/accept-invitation-update-req.dto';
import { GroupCreateReqDto } from '@/models/dto/group/req/group-create-req.dto';
import { GroupUpdateReqDto } from '@/models/dto/group/req/group-update-req.dto';
import { ScheduleCreateReqDto } from '@/models/dto/schedule/req/schedule-create-req.dto';
import { TourismPeriodUpdateReqDto } from '@/models/dto/schedule/req/tourism-period-update-req.dto';

import { GroupsService } from './groups.service';
import { FamsService } from '../fams/fams.service';
import { MembersService } from '../members/members.service';
import { SchedulesService } from '../schedules/schedules.service';

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
	@UseInterceptors(TransactionInterceptor)
	@Post()
	async createGroup(
		@Body() dto: GroupCreateReqDto,
		@CurrentUser('sub') sub: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const { groupName, groupDescription } = dto;

		return await this.groupsService.createGroup(
			{
				memberId: sub,
				groupName,
				groupDescription,
			},
			qr,
		);
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
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@CurrentUser('sub') sub: string,
		@Body() dto: GroupUpdateReqDto,
	) {
		const { groupName, groupDescription } = dto;

		return await this.groupsService.updateGroup({
			groupId,
			groupName,
			groupDescription,
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
	@UseInterceptors(TransactionInterceptor)
	@Delete(':groupId')
	async deleteGroup(
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@CurrentUser('sub') sub: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		return await this.groupsService.deleteGroup(
			{
				groupId,
				memberId: sub,
			},
			qr,
		);
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
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@Query(
			'page',
			new DefaultValuePipe(1),
			new ParseIntPipe({ exceptionFactory: () => parseIntPipeMessage('page') }),
		)
		page: number,
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
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@Param(
			'memberId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		memberId: string,
	) {
		//자기 자신을 초대한지 체크
		if (sub === memberId) {
			throw BadRequestServiceException(ERROR_CANNOT_INVITE_SELF);
		}

		// 멤버 체크
		await this.membersService.findMemberByIdOrThrow(memberId);

		await this.famsService.createFamByMemberOfGroup({
			memberId,
			groupId,
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
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@Param(
			'memberId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		memberId: string,
		@Param(
			'famId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		famId: string,
		@Body() dto: AcceptInvitationUpdateReqDto,
	) {
		//초대 받은 멤버와 인증된 멤버와 같은지 체크
		if (sub !== memberId) {
			throw BadRequestServiceException(ERROR_INVITED_MEMBER_NOT_FOUND);
		}

		// 초대받은 유저인지 체크
		await this.famsService.checkIfFamExists({
			groupId,
			memberId,
			famId,
		});

		return await this.famsService.updateFamInvitationAccept({
			groupId,
			memberId,
			famId,
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
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@Param(
			'memberId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		memberId: string,
		@Param(
			'famId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		famId: string,
	) {
		// fam에 존재하는지 확인
		const fam = await this.famsService.checkIfFamExists({
			groupId,
			memberId,
			famId,
		});

		await this.famsService.deleteFamByMemberOfGroup({
			groupId,
			memberId,
			famId,
		});

		return fam;
	}

	/**
	 * @summary 여행일정 리스트 전체 가져오기
	 *
	 * @tag groups
	 * @param {number} page 							- 페이지 번호
	 * @param {number} limit 							- 가져 올 갯수
	 * @param {string} groupId 							- 그룹 아이디
	 * @param {string} sub  							- 인증된 사용자 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 여행 일정 리스트
	 */
	@GetScheduleListSwagger()
	@Get('/:groupId/schedules')
	async getScheduleListOwnMemberId(
		@Query(
			'page',
			new DefaultValuePipe(1),
			new ParseIntPipe({ exceptionFactory: () => parseIntPipeMessage('page') }),
		)
		page: number,
		@Query(
			'limit',
			new DefaultValuePipe(3),
			new ParseIntPipe({ exceptionFactory: () => parseIntPipeMessage('page') }),
		)
		limit: number,
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@CurrentUser('sub') sub: string,
	) {
		// 그룹에 속한 사람인지 체크
		await this.groupsService.checkRoleOfGroupExists(groupId, sub);

		return await this.schedulesService.getScheduleListOwnMemberId({
			memberId: sub,
			page,
			limit,
		});
	}

	/**
	 * @summary 특정 여행일정 가져오기
	 *
	 * @tag groups
	 * @param {string} groupId 							- 그룹 아이디
	 * @param {string} scheduleId 						- 여행일정 아이디
	 * @param {string} sub  							- 인증된 사용자 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 특정 여행 일정
	 */
	@GetOneScheduleSwagger()
	@UseGuards(GroupMemberShipGuard)
	@Get('/:groupId/schedules/:scheduleId')
	async getOneScheduleById(
		@Param(
			'scheduleId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		scheduleId: string,
	) {
		return await this.schedulesService.getOneScheduleById(scheduleId);
	}

	/**
	 * @summary 특정 그룹의 여행 일정 작성하기
	 *
	 * @tag groups
	 * @param {string} groupId 							- 그룹 아이디
	 * @param {string} sub  							- 인증된 사용자 아이디
	 * @param {ScheduleCreateReqDto} dto  		- 여행 일정별 정보
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 일정 아이디
	 */
	@CreateToursScheduleSwagger()
	@UseGuards(GroupMemberShipGuard)
	@UseInterceptors(TransactionInterceptor)
	@Post('/:groupId/schedules')
	async createToursSchedule(
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@CurrentUser('sub') sub: string,
		@Body() dto: ScheduleCreateReqDto,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		return await this.schedulesService.createToursSchedule(
			{
				memberId: sub,
				groupId,
				scheduleItem: dto,
			},
			qr,
		);
	}

	/**
	 * @summary 특정 그룹의 여행 일정 수정하기
	 *
	 * @tag groups
	 * @param {string} groupId 							- 그룹 아이디
	 * @param {string} scheduleId  						- 여행일정 스케줄 아이디
	 * @param {string} sub  							- 인증된 사용자 아이디
	 * @param {TourismPeriodUpdateReqDto[]} dto  		- 여행 일정별 정보
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 일정 아이디
	 */
	@UpdateToursScheduleSwagger()
	@UseGuards(GroupMemberShipGuard, IsMineScheduleGuard)
	@UseInterceptors(TransactionInterceptor)
	@Put('/:groupId/schedules/:scheduleId')
	async updateToursSchedule(
		@Param(
			'groupId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		groupId: string,
		@Param(
			'scheduleId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		scheduleId: string,
		@CurrentUser('sub') sub: string,
		@Body() dto: TourismPeriodUpdateReqDto[],
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		return await this.schedulesService.updateToursSchedule(
			{
				memberId: sub,
				groupId,
				scheduleId,
				periods: dto,
			},
			qr,
		);
	}

	/**
	 * @summary 특정 그룹의 여행 일정 삭제하기
	 *
	 * @tag groups
	 * @param {string} groupId 							- 그룹 아이디
	 * @param {string} scheduleId  						- 여행일정 스케줄 아이디
	 * @param {string} sub  							- 인증된 사용자 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@DeleteToursScheduleSwagger()
	@UseGuards(GroupMemberShipGuard, IsMineScheduleGuard)
	@UseInterceptors(TransactionInterceptor)
	@Delete('/:groupId/schedules/:scheduleId')
	async deleteToursSchedule(
		@Param(
			'scheduleId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		scheduleId: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		return await this.schedulesService.deleteToursSchedule(scheduleId, qr);
	}
}
