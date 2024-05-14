import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { ICreateSharedScheduleMemberArgs } from '@/types/args/schedule';

import { SharedScheduleMemberEntity } from '../entities/shared-schedule-member.entity';

@Injectable()
export class SharedScheduleMemberRepository extends Repository<SharedScheduleMemberEntity> {
	constructor(
		@InjectRepository(SharedScheduleMemberEntity)
		private readonly repository: Repository<SharedScheduleMemberEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<SharedScheduleMemberEntity>(
					SharedScheduleMemberEntity,
			  )
			: this.repository;
	}

	async createSharedScheduleMember(
		sharedScheduleMembers: ICreateSharedScheduleMemberArgs[],
		qr?: QueryRunner,
	) {
		const repository = this.getRepository(qr);

		await repository.insert(sharedScheduleMembers);
	}
}
