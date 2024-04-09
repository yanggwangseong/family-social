import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@/models/repositories/notifications.repository';

@Injectable()
export class NotificationsService {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}
}
