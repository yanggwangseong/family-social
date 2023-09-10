import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { FamEntity } from './fam.entity';

@Entity({ name: 'fam_group' })
export class GroupEntity extends DefaultEntity {
	@Column({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(60)
	groupName!: string;

	@OneToMany(() => FamEntity, (fa) => fa.group)
	groupByMemberGroups?: FamEntity[];
}
