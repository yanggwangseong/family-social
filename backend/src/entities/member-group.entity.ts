import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { MemberEntity } from './member.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { GroupEntity } from './group.entity';

export type Trole = 'main' | 'user';

@Entity({ name: 'fam_member_group' })
export class MemberGroupEntity extends DefaultEntity {
	@Column({
		type: 'varchar',
		length: 30,
		nullable: false,
		default: 'user',
	})
	role!: Trole;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	memberId!: string;

	@Column({ type: 'uuid', nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	groupId!: string;

	@ManyToOne((type) => MemberEntity, (member) => member.memberGroups)
	@JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
	member!: MemberEntity;

	@ManyToOne((type) => GroupEntity, (group) => group.groupByMemberGroups)
	@JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
	group!: GroupEntity;
}
