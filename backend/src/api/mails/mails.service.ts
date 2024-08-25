import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { GroupInvitedEmailsReqDto } from '@/models/dto/group/req/group-invited-emails-req.dto';
import { GroupProfileResDto } from '@/models/dto/group/res/group-profile.rest.dto';
import { MailSendLogEntity } from '@/models/entities/mail-send-log.entity';
import { MailSendLogRepository } from '@/models/repositories/mail-send-log.repository';
import { OverrideInsertFeild } from '@/types/repository';

import { InvitationsService } from '../invitations/invitations.service';

@Injectable()
export class MailsService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly invitationsService: InvitationsService,
		private readonly mailSendLogRepository: MailSendLogRepository,
	) {}

	async sendInvitedEmailOfGroup(
		{ invitedEmails }: GroupInvitedEmailsReqDto,
		group: GroupProfileResDto,
	) {
		/**
		 * email 링크 초대일경우 email 갯수만큼 초대 Limit 설정
		 *
		 */
		const inviteLink = this.invitationsService.createGroupInviteLink(
			group.id,
			invitedEmails.length,
		);
		const sendResult = await Promise.allSettled(
			invitedEmails.map(async (email) => {
				const subject = `${group.groupName} 그룹에 그룹 가입 초대를 받았습니다`;
				const htmlContent = `<!DOCTYPE html>
				<html lang="ko">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>${group.groupName} 그룹에 그룹 가입 초대를 받았습니다</title>
				</head>
				<body
					style='font-family: Arial, sans-serif;
						   margin: 0;
						   padding: 0;
						   background-color: #f4f4f4;
						   text-align: center;'
					>
					<div
						style='padding: 20px;
							   background-color: #ffffff;
							   border-radius: 5px;
							   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'
						>
						<h1>그룹 가입 초대를 받았습니다</h1>
						<p
							style='font-size: 24px;
								   font-weight: bold;
								   color: #007bff;'
							>${inviteLink}</p>
						<p style='margin-top:30px;'>링크를 클릭하여 그룹에 참여해보세요.</p>
						<p>만약 이 서비스에 가입하지 않으셨다면 이 이메일을 무시하셔도 됩니다.</p>
						<p>감사합니다.</p>
					</div>
				</body>
				</html>
				`;

				return await this.sendEmail(email, subject, subject, htmlContent);
			}),
		);

		const newMailLog = this.createMailSendLogs(sendResult);

		await this.mailSendLogRepository.createMailSendLog(newMailLog);
	}

	async sendSignUpEmailVerify(
		email: string,
		signupVerifyToken: string,
		qr?: QueryRunner,
	): Promise<void> {
		const subject = `이메일 인증`;
		const htmlContent = `<!DOCTYPE html>
		<html lang="ko">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>이메일 인증</title>
		</head>
		<body
			style='font-family: Arial, sans-serif;
				   margin: 0;
				   padding: 0;
				   background-color: #f4f4f4;
				   text-align: center;'
			>
			<div
				style='padding: 20px;
					   background-color: #ffffff;
					   border-radius: 5px;
					   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'
				>
				<h1>이메일 인증</h1>
				<p style='margin-bottom:30px;'>가입해 주셔서 감사합니다! 아래의 인증 코드를 사용하세요:</p>
				<p
					style='font-size: 24px;
						   font-weight: bold;
						   color: #007bff;'
					>${signupVerifyToken}</p>
				<p style='margin-top:30px;'>이 코드를 인증 페이지에서 입력하여 가입을 완료하세요.</p>
				<p>만약 이 서비스에 가입하지 않으셨다면 이 이메일을 무시하셔도 됩니다.</p>
				<p>감사합니다.</p>
			</div>
		</body>
		</html>
		`;
		const sendResult = await Promise.allSettled([
			await this.sendEmail(email, subject, subject, htmlContent),
		]);

		const newMailLog = this.createMailSendLogs(sendResult);

		await this.mailSendLogRepository.createMailSendLog(newMailLog, qr);
	}

	private async sendEmail(
		email: string,
		subject: string,
		text: string,
		htmlContent: string,
	) {
		const result = await this.mailerService
			.sendMail({
				to: email,
				subject,
				text: text,
				html: htmlContent,
			})
			.catch((err) => {
				throw {
					reason: err,
					toEmail: email,
					subject,
				};
			});
		return {
			value: result,
			toEmail: email,
			subject,
		};
	}

	private createMailSendLogs(mails: PromiseSettledResult<any>[]) {
		return this.mailSendLogRepository.create(
			mails.map((data): OverrideInsertFeild<MailSendLogEntity> => {
				return data.status === 'fulfilled'
					? {
							id: uuidv4(),
							toEmail: data.value.toEmail,
							mailSubject: data.value.subject,
							sendStatus: true,
					  }
					: {
							id: uuidv4(),
							toEmail: data.reason.toEmail,
							mailSubject: data.reason.subject,
							sendStatus: false,
							reasonMessage:
								data.reason.reason instanceof Error
									? data.reason.reason.message
									: '',
					  };
			}),
		);
	}
}
