import {
	Body,
	Controller,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	UseInterceptors,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@ApiTags('members')
@Controller('members')
export class MembersController {
	constructor(private readonly membersService: MembersService) {}

	/**
	 * @summary 계정 정보 수정 api 추가
	 *
	 * @tag members
	 * @param {string} memberId   - 수정 할 memberId
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@Put(':memberId')
	async updateMemberProfile(
		@Param('memberId', ParseUUIDPipe) memberId: string,
	) {}
}
