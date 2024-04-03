import { Module } from '@nestjs/common';

import { MailsService } from './mails.service';

@Module({
	imports: [],
	controllers: [],
	providers: [MailsService],
	exports: [],
})
export class MailsModule {}
