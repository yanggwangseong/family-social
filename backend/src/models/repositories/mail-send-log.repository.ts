import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MailSendLogEntity } from '../entities/mail-send-log.entity';

@Injectable()
export class MailSendLogRepository extends Repository<MailSendLogEntity> {
	constructor(
		@InjectRepository(MailSendLogEntity)
		private readonly repository: Repository<MailSendLogEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
