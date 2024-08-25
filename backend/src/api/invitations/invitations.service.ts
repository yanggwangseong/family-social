import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

import {
	EntityConflictException,
	UnAuthOrizedException,
} from '@/common/exception/service.exception';
import {
	ERROR_INVITE_LINK_EXPIRED,
	ERROR_INVITE_USES_LIMIT,
} from '@/constants/business-error';
import {
	ENV_CLIENT_SOCKET_URL,
	ENV_GROUP_INVITE_TTL,
} from '@/constants/env-keys.const';
import { generateRandomCode } from '@/utils/generate-random-code';

@Injectable()
export class InvitationsService {
	constructor(
		private readonly configService: ConfigService,
		@InjectRedis() private readonly redis: Redis,
	) {}

	/**
	 * @description 그룹 초대 링크를 만든다.
	 * @param groupId 초대코드로 찾을 수 있는 그룹 아이디
	 * @param maxUses 해당 초대코드로 가입 할 수 있는 인원 제한
	 * @returns 그룹 초대 링크 url
	 */
	async createGroupInviteLink(groupId: string, maxUses: number) {
		const inviteCode = generateRandomCode(10) + uuidv4();
		const ttl = this.configService.get(ENV_GROUP_INVITE_TTL);
		const url = new URL(this.configService.get(ENV_CLIENT_SOCKET_URL)!);
		url.pathname = `${url.pathname}/groups/${groupId}/g/${inviteCode}`;

		const groupInviteData = {
			groupId,
			remainingUses: maxUses, // 초대 가입 최대 사용 횟수를 설정
		};

		await this.redis.hset(inviteCode, groupInviteData);

		// TTL 설정
		await this.redis.expire(inviteCode, ttl);

		return url.toString();
	}

	// 1. 링크 클릭 -> 로그인 요청 -> 이메일 로그인이든 카카오 로그인이든 뭐든 자기가 가입했던 그대로
	// 2. 회원가입 안한 회원이라도 회원가입 하면 되니까 가입. (이때 groupId랑 초대 코드 어디에 보관할것인가 ? )
	// 3. 로그인이나 회원가입을 성공하면 -> 그룹 가입 링크로 이동 00 그룹에 초대에 승낙 하시겠습니까? 확인 -> validateInviteLink 여기로 초대코드 validation 하기
	// 4. 해당 memberId와 같다면
	async validateInviteLink(inviteCode: string) {
		const inviteData = await this.redis.hgetall(inviteCode);

		if (!inviteData) {
			throw UnAuthOrizedException(ERROR_INVITE_LINK_EXPIRED);
		}

		const remainingUses = parseInt(inviteData.remainingUses);

		if (remainingUses <= 0) {
			throw EntityConflictException(ERROR_INVITE_USES_LIMIT);
		}

		// remainingUses 업데이트
		await this.redis.hincrby(inviteCode, 'remainingUses', -1);
	}
}
