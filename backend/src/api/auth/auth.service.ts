import {
	EntityConflictException,
	EntityNotFoundException,
} from '@/common/exception/service.exception';
import { Injectable } from '@nestjs/common';
import { ICreateMemberArgs } from '@/types/args/member';
import { MemberResDto } from '@/dto/member/res/member-res.dto';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { MembersRepository } from '../members/members.repository';

@Injectable()
export class AuthService {
	constructor(private readonly membersRepository: MembersRepository) {}

	async createMember(dto: ICreateMemberArgs): Promise<MemberResDto> {
		const member = await this.membersRepository.findMemberByEmail({
			email: dto.email,
		});
		if (member)
			throw EntityConflictException(
				'해당 이메일에 해당하는 유저가 존재 합니다.',
			);

		const signupVerifyToken = await this.EncryptHashData(uuidv4());
		// dto.password = await this.hashData(dto.password);
		const newMember = await this.membersRepository.createMember(
			dto,
			signupVerifyToken,
		);
		if (!newMember)
			throw EntityNotFoundException('생성한 유저를 찾을 수 없습니다.');

		//유저 생성 성공 후 email 인증코드 전송.

		return newMember;
	}

	private async sendSignUpEmailVerify() {}

	private async EncryptHashData<T extends string>(data: T) {
		const salt = await bcrypt.genSalt();

		const hashData = await bcrypt.hash(data, salt);
		return hashData;
	}

	private async CompareHashData() {}
}
