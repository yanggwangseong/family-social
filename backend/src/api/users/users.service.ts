import { EntityNotFoundException } from '@/common/exception/service.exception';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
	constructor(private readonly mailerService: MailerService) {}

	async test(args?: string) {
		//if (!args) throw EntityNotFoundException('공지사항을 찾을 수 없습니다');
		try {
			await this.mailerService.sendMail({
				to: 'rhkdtjd_12@naver.com',
				subject: 'Test email',
				text: 'test',
				html: '<div>회원가입 코드 : 123456</div>',
			});
		} catch (error) {
			console.log(error);
		}

		return 'hellow2';
	}
}
