import { Injectable } from '@nestjs/common';

import { DefaultEntity } from './common/default.entity';

@Injectable()
export class MailSendLogEntity extends DefaultEntity {}
