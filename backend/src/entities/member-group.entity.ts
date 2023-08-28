import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './common/default.entity';

@Entity({ name: 'fam_member_group' })
export class MemberGroupEntity extends DefaultEntity {
	@Column({ type: 'varchar', length: 30, nullable: false })
	role!: string;
}
