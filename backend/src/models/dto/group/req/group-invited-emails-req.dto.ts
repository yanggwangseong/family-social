import { IsEmail } from 'class-validator';

import { emailValidationMessage } from '@/common/validation-message/email-validation-message';

export class GroupInvitedEmailsReqDto {
	@IsEmail({}, { each: true, message: emailValidationMessage })
	invitedEmails!: string[];
}
