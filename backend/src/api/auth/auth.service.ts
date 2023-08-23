import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { Injectable, Logger } from '@nestjs/common';
import { ICreateMemberArgs, IVerifyEmailArgs } from '@/types/args/member';
import { MemberResDto } from '@/dto/member/res/member-res.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { MembersRepository } from '../members/members.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { generateRandomCode } from '@/utils/generate-random-code';

@Injectable()
export class AuthService {
	constructor(
		private readonly membersRepository: MembersRepository,
		private readonly mailerService: MailerService,
	) {}

	async createMember(dto: ICreateMemberArgs): Promise<MemberResDto> {
		const member = await this.membersRepository.findMemberByEmail({
			email: dto.email,
		});
		if (member)
			throw EntityConflictException(
				'해당 이메일에 해당하는 유저가 존재 합니다.',
			);

		const signupVerifyToken = generateRandomCode(10);
		const newMember = await this.membersRepository.createMember(
			dto,
			await this.EncryptHashData(signupVerifyToken),
		);
		if (!newMember)
			throw EntityNotFoundException('생성한 유저를 찾을 수 없습니다.');

		//유저 생성 성공 후 email 인증코드 전송.
		await this.sendSignUpEmailVerify(dto.email, signupVerifyToken);

		return newMember;
	}

	async verifyEmail(dto: IVerifyEmailArgs) {
		const email = await this.membersRepository.findMemberByEmail({
			email: dto.email,
		});

		if (!email)
			throw EntityNotFoundException(
				'이메일에 해당하는 유저를 찾을 수 없습니다',
			);

		const code = await this.membersRepository.findsignupVerifyTokenByEmail({
			email: dto.email,
		});

		if (!code.signupVerifyToken || !dto.signupVerifyToken)
			throw EntityNotFoundException(
				'이메일에 해당하는 인증코드를 찾을 수 없습니다',
			);

		const verifyEmailMatches = await this.CompareHashData(
			dto.signupVerifyToken,
			code.signupVerifyToken,
		);
		return verifyEmailMatches;
	}

	private async sendSignUpEmailVerify(
		email: string,
		signupVerifyToken: string,
	) {
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

	private async EncryptHashData<T extends string>(data: T) {
		const salt = await bcrypt.genSalt(10);

		const hashData = await bcrypt.hash(data, salt);
		return hashData;
	}

	private async CompareHashData<T extends string>(userInput: T, storedHash: T) {
		const compare = await bcrypt.compare(userInput, storedHash);
		return compare;
	}
}
