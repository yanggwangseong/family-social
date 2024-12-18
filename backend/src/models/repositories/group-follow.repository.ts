import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

import { GroupFollowEntity } from '../entities/group.follow.entity';

@Injectable()
export class GroupFollowRepository extends Repository<GroupFollowEntity> {
	constructor(
		@InjectRepository(GroupFollowEntity)
		private readonly repository: Repository<GroupFollowEntity>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	getRepository(qr?: QueryRunner) {
		return qr
			? qr.manager.getRepository<GroupFollowEntity>(GroupFollowEntity)
			: this.repository;
	}

	async getFollowers(followedGroupId: string): Promise<string[]> {
		return await this.repository
			.find({
				select: {
					followingGroupId: true,
				},
				where: { followedGroupId },
			})
			.then((data) => data.map((data) => data.followingGroupId));
	}

	async getFollowings(followingGroupId: string): Promise<string[]> {
		return await this.repository
			.find({
				select: { followedGroupId: true },
				where: { followingGroupId },
			})
			.then((data) => data.map((data) => data.followedGroupId));
	}

	async removeFollow(
		followingGroupId: string,
		followedGroupId: string,
		qr?: QueryRunner,
	) {
		const repository = this.getRepository(qr);
		await repository.delete({ followingGroupId, followedGroupId });
	}

	async addFollow(
		followingGroupId: string,
		followedGroupId: string,
		qr?: QueryRunner,
	) {
		const repository = this.getRepository(qr);
		await repository.insert({ followingGroupId, followedGroupId });
	}
}
