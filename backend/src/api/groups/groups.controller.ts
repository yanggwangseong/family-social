import { Controller, UseInterceptors } from '@nestjs/common';

import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { GroupsService } from './groups.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@Controller('groups')
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) {}
}
