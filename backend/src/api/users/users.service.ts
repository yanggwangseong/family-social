import { LocalDateTime } from '@js-joda/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

import { TestEntity } from '@/models/entities/test.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(TestEntity)
		private testRepository: Repository<TestEntity>,
		private readonly mailerService: MailerService,
	) {}

	async test() {
		const now = LocalDateTime.now(); // yyyy-MM-dd

		const newDate = this.testRepository.create({
			content: 'hello',
			orderDateTime: now,
		});

		const success = await this.testRepository.insert(newDate);

		const result = await this.testRepository.findOneOrFail({
			where: {
				id: success.identifiers[0].id,
			},
		});

		return result.createdAt;
	}
}
