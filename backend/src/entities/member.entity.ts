import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { DefaultEntity } from './common/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { FamEntity } from './fam.entity';
import { LikeFeedEntity } from './fam-like-feed.entity';

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
	@ApiProperty()
	@IsString()
	@MaxLength(60)
	@MinLength(10)
	@Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
	password?: string;

	@Column({ type: 'varchar', length: 30, nullable: false })
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(30)
	phoneNumber!: string;

	@Column({ type: 'varchar', length: 60, nullable: true })
	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(10)
	@MinLength(10)
	signupVerifyToken?: string;

	@Column({ default: false, nullable: false }) // 최초 로그인 여부를 나타내는 플래그
	isFirstLogin!: boolean;

	@Column({ type: 'varchar', length: 30, nullable: true })
	@ApiProperty()
	@IsOptional()
	@MaxLength(30)
	socialType?: 'kakao' | 'google' | 'naver';

	@Column({ type: 'varchar', length: 60, nullable: true })
	@ApiProperty()
	@IsOptional()
	@MaxLength(60)
	refreshToken?: string;

	@OneToMany(() => FamEntity, (fa) => fa.member)
	memberGroups?: FamEntity[];

	@OneToMany(() => LikeFeedEntity, (lf) => lf.member)
	memberLikesFeeds?: LikeFeedEntity[];
}
