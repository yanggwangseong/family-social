import {
	Body,
	Controller,
	Param,
	ParseUUIDPipe,
	Post,
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
} from '@/common/decorators/swagger/swagger-group.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { GroupMemberCreateReqDto } from '@/dto/group/req/group-member-create-req.dto';

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
}
