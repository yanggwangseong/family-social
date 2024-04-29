import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { v4 as uuidv4 } from 'uuid';

import { MentionCreateReqDto } from '../dto/mention/req/mention-create-req.dto';
import { MentionEntity } from '../entities/mention.entity';

@Injectable()
export class MentionsRepository extends Repository<MentionEntity> {
	constructor(
		@InjectRepository(MentionEntity)
		private readonly repository: Repository<MentionEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getMentionRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<MentionEntity>(MentionEntity)
			: this.repository;
	}

	async createMentions(
		insertMentions: QueryDeepPartialEntity<MentionEntity>[],
		qr?: QueryRunner,
	) {
		const mentionsRepository = this.getMentionRepository(qr);

		await mentionsRepository.insert(insertMentions);
	}

	async getMentions(overrideWhere: FindOptionsWhere<MentionEntity>) {
		const mentions = await this.repository.find({
			select: {
				id: true,
				mentionRecipient: {
					id: true,
					profileImage: true,
					username: true,
					email: true,
				},
			},
			where: {
				...overrideWhere,
			},
			relations: {
				mentionRecipient: true,
			},
		});

		return mentions;
	}
}
