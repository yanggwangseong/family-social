import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';

import { DefaultEntity } from './common/default.entity';
import { GroupEntity } from './group.entity';
import { MemberEntity } from './member.entity';

export type roleType = 'main' | 'user';

@Entity({ name: 'fam' })
export class FamEntity extends DefaultEntity {
	@ApiProperty()
	@Column({
		type: 'varchar',
		length: 30,
		nullable: false,
		default: 'user',
	})
	role!: roleType;

	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsBoolean()
	@Column({
		type: 'boolean',
		nullable: false,
		default: false,
	})
	invitationAccepted!: boolean;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID()
	public readonly memberId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID()
	public readonly groupId!: string;

	@ManyToOne(() => MemberEntity, (member) => member.memberGroups)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => GroupEntity, (group) => group.groupByMemberGroups)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;
}
