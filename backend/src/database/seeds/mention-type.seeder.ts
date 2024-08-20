import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { MentionTypeEntity } from '@/models/entities/mention-type.entity';
import { MentionType } from '@/types';

export default class MentionTypeSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<any> {
		const repository = dataSource.getRepository(MentionTypeEntity);

		const initNotification = repository.create(
			MentionType.map((item) => ({
				mentionType: item,
			})),
		);

		await repository.insert(initNotification);
	}
}
