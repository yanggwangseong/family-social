import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { QueryRunner } from 'typeorm';

import { GroupInvitedEmailsReqDto } from '@/models/dto/group/req/group-invited-emails-req.dto';
import { GroupProfileResDto } from '@/models/dto/group/res/group-profile.rest.dto';

@Injectable()
export class MailsService {
	constructor(private readonly mailerService: MailerService) {}

	async sendInvitedEmailOfGroup(
		{ invitedEmails }: GroupInvitedEmailsReqDto,
		group: GroupProfileResDto,
	) {
		const inviteLink = 'http://localhost:3000/g/:groupId/:famId';
		const sendResult = await Promise.allSettled(
			invitedEmails.map(async (email) => {
				return await this.mailerService.sendMail({
					to: email,
					subject: `${group.groupName} 그룹에 그룹 가입 초대를 받았습니다`,
					text: `${group.groupName} 그룹에 그룹 가입 초대를 받았습니다`,
					html: `<!DOCTYPE html>
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
						<p style='margin-bottom:30px;'>가입해 주셔서 감사합니다! 아래의 인증 코드를 사용하세요:</p>
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
				`,
				});
			}),
		);
	}

	async sendSignUpEmailVerify(
		email: string,
		signupVerifyToken: string,
		qr?: QueryRunner,
	): Promise<void> {
		try {
			await this.mailerService.sendMail({
				to: email,
				subject: '이메일 인증',
				text: '이메일 인증',
				html: `<!DOCTYPE html>
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
				`,
			});
		} catch (error: any) {
			throw Error(error);
		}
	}
}
