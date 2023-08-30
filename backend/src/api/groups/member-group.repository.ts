import { MemberGroupEntity } from '@/entities/member-group.entity';
import {
	ICreateMemberGroupArgs,
	IUpdateGroupMemberInvitationAccept,
} from '@/types/args/member-group';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MemberGroupRepository extends Repository<MemberGroupEntity> {
	constructor(
		@InjectRepository(MemberGroupEntity)
		private readonly repository: Repository<MemberGroupEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findMemberGroupById({
		memberGroupId,
		memberId,
	}: {
		memberGroupId: string;
		memberId: string;
	}) {
		const memberGroup = await this.repository.findOne({
			where: {
				id: memberGroupId,
				memberId: memberId,
			},
			select: {
				id: true,
			},
		});

		return memberGroup;
	}

	async findOrFailMemberGroupById({
		memberGroupId,
	}: {
		memberGroupId: string;
	}) {
		const memberGroup = await this.repository.findOneOrFail({
			where: {
				id: memberGroupId,
			},
			select: {
				id: true,
			},
		});

		return memberGroup;
	}

	async createMemberGroup({
		memberId,
		groupId,
		role,
		invitationAccepted,
	}: ICreateMemberGroupArgs) {
		const insertResult = await this.repository.insert({
			id: uuidv4(),
			memberId: memberId,
			groupId: groupId,
			role: role,
			invitationAccepted: invitationAccepted,
		});

		const id: string = insertResult.identifiers[0].id;

		return this.findOrFailMemberGroupById({ memberGroupId: id });
	}

	async updateGroupMemberInvitationAccept({
		memberId,
		memberGroupId,
		invitationAccepted,
	}: IUpdateGroupMemberInvitationAccept) {
		await this.update(
			{ id: memberGroupId, memberId: memberId },
			{ invitationAccepted: invitationAccepted },
		);
	}
}
