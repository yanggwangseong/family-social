import { Module } from '@nestjs/common';

import { MailsService } from './mails.service';

@Module({
	imports: [],
	controllers: [],
	providers: [MailsService],
	exports: [MailsService],
})
export class MailsModule {}
