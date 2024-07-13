import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';

import { booleanValidationMessage } from '@/common/validation-message/boolean-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { uuidValidationMessage } from '@/common/validation-message/uuid-validation-message';

import { DefaultEntity } from './common/default.entity';
import { GroupEntity } from './group.entity';
import { MemberEntity } from './member.entity';
import { SharedScheduleMemberEntity } from './shared-schedule-member.entity';

export type roleType = 'main' | 'user';

@Entity({ name: 'fam' })
@Index(['createdAt'])
@Index(['updatedAt'])
@Index(['memberId'])
@Index(['groupId'])
export class FamEntity extends DefaultEntity {
	@ApiProperty()
	@Column({
		type: 'varchar',
		length: 30,
		nullable: false,
		default: 'user',
	})
	role!: roleType;

	@ApiProperty({
		description: '초대 수락 여부',
	})
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsBoolean({
		message: booleanValidationMessage,
	})
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
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly memberId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsUUID(4, { message: uuidValidationMessage })
	public readonly groupId!: string;

	@ManyToOne(() => MemberEntity, (member) => member.memberGroups)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne(() => GroupEntity, (group) => group.groupByMemberGroups)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;

	@OneToMany(() => SharedScheduleMemberEntity, (scm) => scm.sharedMember)
	sharedMembers!: SharedScheduleMemberEntity[];
}
