import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { OverrideInsertArrayFeild } from '@/types/repository';

import { MailSendLogEntity } from '../entities/mail-send-log.entity';

@Injectable()
export class MailSendLogRepository extends Repository<MailSendLogEntity> {
	constructor(
		@InjectRepository(MailSendLogEntity)
		private readonly repository: Repository<MailSendLogEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<MailSendLogEntity>(MailSendLogEntity)
			: this.repository;
	}

	async createMailSendLog(
		overrideInsertArrayFeild: OverrideInsertArrayFeild<MailSendLogEntity>,
		qr?: QueryRunner,
	) {
		const mentionsRepository = this.getRepository(qr);

		await mentionsRepository.insert(overrideInsertArrayFeild);
	}
}
