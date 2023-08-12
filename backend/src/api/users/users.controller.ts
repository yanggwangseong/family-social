import { Controller, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
}
