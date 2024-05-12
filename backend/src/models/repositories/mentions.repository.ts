import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { MentionResDto } from '../dto/mention/res/mention-res.dto';
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

	async deleteMentions(
		overrideWhere: FindOptionsWhere<MentionEntity>,
		qr?: QueryRunner,
	): Promise<boolean> {
		const mentionRepository = this.getMentionRepository(qr);

		const { affected } = await mentionRepository.delete({ ...overrideWhere });

		return !!affected;
	}

	async getMentions(
		overrideWhere: FindOptionsWhere<MentionEntity>,
	): Promise<MentionResDto[]> {
		const mentions = await this.repository
			.find({
				select: {
					id: true,
					mentionPosition: true,
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
			})
			.then((data) =>
				data.sort((a, b) => a.mentionPosition - b.mentionPosition),
			); // mention은 최대 10개밖에 되지 않기 때문에 데이터베이스에서의 sort보다 애플리케이션에서 sort하는게 낫지 않을까

		return mentions;
	}
}
