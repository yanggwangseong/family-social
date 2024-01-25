import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';

import { UsersService } from './users.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async test() {
		return await this.usersService.test();
	}
}
