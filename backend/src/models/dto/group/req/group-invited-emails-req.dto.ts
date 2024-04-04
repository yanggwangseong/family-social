import { IsEmail } from 'class-validator';

export class GroupInvitedEmailsReqDto {
	@IsEmail({}, { each: true })
	invitedEmails!: string[];
}
