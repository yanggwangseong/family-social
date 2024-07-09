import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';

import { UsersResDto } from './users-res.dto';
import { UsersService } from './users.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async test() {
		const user = await this.usersService.test();

		return plainToInstance(UsersResDto, {
			createdAt: user,
		});
	}
}
