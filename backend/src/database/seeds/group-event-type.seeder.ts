import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { GroupEventTypeEntity } from '@/models/entities/group-event-type.entity';
import { EventType } from '@/types';

export default class GroupEventTypeSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<any> {
		const repository = dataSource.getRepository(GroupEventTypeEntity);

		const initGroupEvent = repository.create(
			EventType.map((item) => ({
				groupEventType: item,
			})),
		);

		await repository.insert(initGroupEvent);
	}
}
