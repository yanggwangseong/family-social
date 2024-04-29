import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
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
		mentions: MentionCreateReqDto[],
		overrideInsertFeilds: Omit<
			QueryDeepPartialEntity<MentionEntity>,
			'id' | 'mentionRecipientId'
		>,
		qr?: QueryRunner,
	) {
		const mentionsRepository = this.getMentionRepository(qr);

		mentions.map(async (mention: MentionCreateReqDto) => {
			await mentionsRepository.insert({
				id: uuidv4(),
				mentionRecipientId: mention.mentionMemberId,
				...overrideInsertFeilds,
			});
		});
	}
}
