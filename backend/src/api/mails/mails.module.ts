import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailSendLogEntity } from '@/models/entities/mail-send-log.entity';
import { MailSendLogRepository } from '@/models/repositories/mail-send-log.repository';

import { MailsService } from './mails.service';
import { InvitationService } from '../invitation/invitation.service';

@Module({
	imports: [TypeOrmModule.forFeature([MailSendLogEntity])],
	controllers: [],
	providers: [MailsService, MailSendLogRepository, InvitationService],
	exports: [MailsService],
})
export class MailsModule {}
