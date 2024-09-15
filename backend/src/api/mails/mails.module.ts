import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailSendLogEntity } from '@/models/entities/mail-send-log.entity';
import { MailSendLogRepository } from '@/models/repositories/mail-send-log.repository';

import { MailsService } from './mails.service';
import { InvitationsModule } from '../invitations/invitations.module';

@Module({
	imports: [TypeOrmModule.forFeature([MailSendLogEntity]), InvitationsModule],
	controllers: [],
	providers: [MailsService, MailSendLogRepository],
	exports: [MailsService],
})
export class MailsModule {}
