import { Column, Entity, Unique } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@Entity({ name: 'fam_member' })
@Unique(['email'])
export class MemberEntity extends DefaultEntity {
	@Column({ type: 'varchar', length: 30, nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(30)
	username!: string;

	@Column({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(50)
	email!: string;

	@Column({ type: 'varchar', length: 60, nullable: true })
	@IsString()
	@MaxLength(60)
	password?: string;

	@Column({ type: 'varchar', length: 30, nullable: true })
	@ApiProperty()
	@MaxLength(30)
	phoneNumber?: string;

	@Column({ type: 'varchar', length: 60, nullable: true })
	@ApiProperty()
	@MaxLength(60)
	signupVerifyToken?: string;

	@Column({ type: 'varchar', length: 30, nullable: true })
	@ApiProperty()
	@MaxLength(30)
	socialType?: 'kakao' | 'google' | 'naver';

	@Column({ type: 'varchar', length: 60, nullable: true })
	@ApiProperty()
	@MaxLength(60)
	refreshToken?: string;
}
