import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
	GUEST = 'guest',
}

@Entity({ name: 'user' })
export class UserEntity {
	@PrimaryColumn('uuid')
	id!: string;

	@Column('varchar', { length: 30 })
	name!: string;
}
