import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { MentionEntity } from '../entities/mention.entity';

export class MentionsRepository extends Repository<MentionEntity> {
	constructor(
		@InjectRepository(MentionEntity)
		private readonly repository: Repository<MentionEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getScheduleRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<MentionEntity>(MentionEntity)
			: this.repository;
	}
}
