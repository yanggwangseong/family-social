import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
	constructor(private readonly mailerService: MailerService) {}

	async test() {
		//if (!args) throw EntityNotFoundException('공지사항을 찾을 수 없습니다');
		try {
			await this.mailerService.sendMail({
				to: 'rhkdtjd_12@naver.com',
				subject: 'Test email',
				text: 'test',
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
						<p>가입해 주셔서 감사합니다! 아래의 인증 코드를 사용하세요:</p>
						<p
							style='font-size: 24px;
								   font-weight: bold;
								   color: #007bff;'
							>123456</p>
						<p>이 코드를 인증 페이지에서 입력하여 가입을 완료하세요.</p>
						<p>만약 이 서비스에 가입하지 않으셨다면 이 이메일을 무시하셔도 됩니다.</p>
						<p>감사합니다.</p>
					</div>
				</body>
				</html>
				`,
			});
		} catch (error) {
			console.log(error);
		}

		return 'hellow2';
	}
}
