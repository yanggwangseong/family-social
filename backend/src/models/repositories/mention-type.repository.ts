import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { MentionType, Union } from '@/types';

import { MentionTypeEntity } from '../entities/mention-type.entity';

@Injectable()
export class MentionTypeRepository extends Repository<MentionTypeEntity> {
	constructor(
		@InjectRepository(MentionTypeEntity)
		private readonly repository: Repository<MentionTypeEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getScheduleRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<MentionTypeEntity>(MentionTypeEntity)
			: this.repository;
	}

	async findMentionTypeId(mentionType: Union<typeof MentionType>) {
		return await this.repository
			.findOneOrFail({
				select: {
					id: true,
					mentionType: true,
				},
				where: {
					mentionType,
				},
			})
			.then((item) => {
				return {
					mentionTypId: item.id,
				};
			});
	}
}
