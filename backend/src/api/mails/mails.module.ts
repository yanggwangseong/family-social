import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailSendLogEntity } from '@/models/entities/mail-send-log.entity';
import { MailSendLogRepository } from '@/models/repositories/mail-send-log.repository';

import { MailsService } from './mails.service';
import { InvitationsService } from '../invitations/invitations.service';

@Module({
	imports: [TypeOrmModule.forFeature([MailSendLogEntity])],
	controllers: [],
	providers: [MailsService, MailSendLogRepository, InvitationsService],
	exports: [MailsService],
})
export class MailsModule {}
