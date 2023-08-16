import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { MembersService } from './members.service';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { CreateMemberSwagger } from '@/common/decorators/swagger/swagger-member.decorator';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@ApiTags('members')
@Controller('members')
export class MembersController {
	constructor(private readonly membersService: MembersService) {}

	@CreateMemberSwagger()
	@Post()
	async createMember() {
		return await this.membersService.createMember();
	}
}
