import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { QueryRunner } from 'typeorm';
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
import { isEmptyObject } from '@/utils/is';

import { FamsService } from '../fams/fams.service';

@Injectable()
export class InvitationsService {
	constructor(
		private readonly configService: ConfigService,
		private readonly famsService: FamsService,
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
		const baseUrl = this.configService.get(ENV_CLIENT_SOCKET_URL)!;

		const url = new URL(`${baseUrl}/groups/${groupId}/g/${inviteCode}`);

		const groupInviteData = {
			groupId,
			remainingUses: maxUses, // 초대 가입 최대 사용 횟수를 설정
		};

		await this.redis.hset(inviteCode, groupInviteData);

		// TTL 설정
		await this.redis.expire(inviteCode, ttl);

		return url.toString();
	}

	async validateInviteLink(
		inviteCode: string,
		memberId: string,
		qr?: QueryRunner,
	) {
		const inviteData = await this.redis.hgetall(inviteCode);

		if (isEmptyObject(inviteData)) {
			throw UnAuthOrizedException(ERROR_INVITE_LINK_EXPIRED);
		}

		const remainingUses = parseInt(inviteData.remainingUses);

		if (remainingUses <= 0) {
			throw EntityConflictException(ERROR_INVITE_USES_LIMIT);
		}

		await this.famsService.createFamByMemberOfGroup(
			{
				memberId,
				groupId: inviteData.groupId,
				invitationAccepted: true,
			},
			qr,
		);

		// remainingUses 업데이트
		await this.redis.hincrby(inviteCode, 'remainingUses', -1);
	}
}
