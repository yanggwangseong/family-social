import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';

import { OverrideInsertArrayFeild } from '@/types/repository';

import { FamSharedMemberResDto } from '../dto/fam/res/fam-shared-member-res.dto';
import { SharedScheduleMemberEntity } from '../entities/shared-schedule-member.entity';

@Injectable()
export class SharedScheduleMemberRepository extends Repository<SharedScheduleMemberEntity> {
	constructor(
		@InjectRepository(SharedScheduleMemberEntity)
		private readonly repository: Repository<SharedScheduleMemberEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<SharedScheduleMemberEntity>(
					SharedScheduleMemberEntity,
			  )
			: this.repository;
	}

	async createSharedScheduleMember(
		overrideInsertArrayFeild: OverrideInsertArrayFeild<SharedScheduleMemberEntity>,
		qr?: QueryRunner,
	) {
		const repository = this.getRepository(qr);

		await repository.insert(overrideInsertArrayFeild);
	}

	async deleteSharedScheduleMember(sharedScheduleId: string, qr?: QueryRunner) {
		const repository = this.getRepository(qr);

		const { affected } = await repository.delete({
			sharedScheduleId,
		});

		return !!affected;
	}

	async findSharedScheduleMembers(
		sharedScheduleIds: string[],
		qr?: QueryRunner,
	): Promise<(FamSharedMemberResDto & { sharedScheduleId: string })[]> {
		const repository = this.getRepository(qr);

		return await repository
			.find({
				select: {
					sharedScheduleId: true,
					sharedFamId: true,
					sharedMember: {
						id: true,
						role: true,
						invitationAccepted: true,
						memberId: true,
						member: {
							id: true,
							username: true,
							profileImage: true,
							email: true,
						},
					},
				},
				relations: {
					sharedMember: {
						member: true,
					},
				},
				where: {
					sharedScheduleId: In(sharedScheduleIds),
				},
			})
			.then((data) =>
				data.map((item) => {
					const { id, role, invitationAccepted, memberId, member } =
						item.sharedMember;
					return {
						sharedScheduleId: item.sharedScheduleId,
						id,
						role,
						invitationAccepted,
						memberId,
						member,
					};
				}),
			);
	}
}
