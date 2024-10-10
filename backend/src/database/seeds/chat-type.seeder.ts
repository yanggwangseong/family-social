import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ChatTypeEntity } from '@/models/entities/chat-type.entity';
import { ChatType } from '@/types';

export default class ChatTypeSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<any> {
		const repository = dataSource.getRepository(ChatTypeEntity);

		const initNotification = repository.create(
			ChatType.map((item) => ({
				chatType: item,
			})),
		);

		await repository.insert(initNotification);
	}
}
