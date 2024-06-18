import { Injectable } from '@nestjs/common';

import { GroupEventTypeRepository } from '@/models/repositories/group-event-type.repository';
import { GroupEventRepository } from '@/models/repositories/group-event.repository';

@Injectable()
export class GroupEventsService {
	constructor(
		private readonly groupEventRepository: GroupEventRepository,
		private readonly groupEventTypeRepository: GroupEventTypeRepository,
	) {}
}
