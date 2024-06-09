import { Entity } from 'typeorm';

import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_mail_send_log' })
export class MailSendLogEntity extends DefaultEntity {}
