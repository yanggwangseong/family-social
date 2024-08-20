import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { NotificationTypeEntity } from '@/models/entities/notification-type.entity';
import { AlarmType } from '@/types';

export default class NotificationTypeSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<any> {
		const repository = dataSource.getRepository(NotificationTypeEntity);

		const initNotification = repository.create(
			AlarmType.map((item) => ({
				notificationType: item,
			})),
		);

		await repository.insert(initNotification);
	}
}
