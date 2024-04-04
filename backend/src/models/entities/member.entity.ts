import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	Matches,
	MaxLength,
} from 'class-validator';
import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';

import { emailValidationMessage } from '@/common/validation-message/email-validation-message';
import { lengthValidationMessage } from '@/common/validation-message/length-validation-message';
import { maxLengthValidationMessage } from '@/common/validation-message/max-length-validation-message';
import { notEmptyValidationMessage } from '@/common/validation-message/not-empty-validation-message';
import { stringValidationMessage } from '@/common/validation-message/string-validation-message';

import { CommentEntity } from './comment.entity';
import { DefaultEntity } from './common/default.entity';
import { FamEntity } from './fam.entity';
import { FeedEntity } from './feed.entity';
import { LikeCommentEntity } from './like-comment.entity';
import { LikeFeedEntity } from './like-feed.entity';
import { MemberChatEntity } from './member-chat.entity';
import { MessageEntity } from './message.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'fam_member' })
@Unique(['email'])
@Index(['createdAt'])
@Index(['updatedAt'])
export class MemberEntity extends DefaultEntity {
	@Column({ type: 'varchar', length: 30, nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(30, { message: maxLengthValidationMessage })
	username!: string;

	@Column({ type: 'varchar', length: 60, nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsEmail({}, { message: emailValidationMessage })
	@MaxLength(50, { message: maxLengthValidationMessage })
	email!: string;

	@Column({ type: 'varchar', length: 60, nullable: true })
	@ApiProperty()
	@IsString({
		message: stringValidationMessage,
	})
	@Length(10, 60, { message: lengthValidationMessage })
	@Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
	password?: string;

	@Column({ type: 'varchar', length: 30, nullable: false })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@MaxLength(30, { message: maxLengthValidationMessage })
	phoneNumber!: string;

	@Column({ type: 'varchar', length: 60, nullable: true })
	@ApiProperty()
	@IsOptional()
	@IsString({
		message: stringValidationMessage,
	})
	@Length(10, 10, { message: lengthValidationMessage })
	signupVerifyToken?: string;

	@Column({ default: false, nullable: false }) // 최초 로그인 여부를 나타내는 플래그
	isFirstLogin!: boolean;

	/**
	 * 서버를 통해 한 번 전처리된 이미지
	 * example is @link {https://folder/test.jpg}
	 *
	 * @minLength 4
	 * @maxLength 2048
	 */
	@Column('varchar', { length: 2048, nullable: true })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@Length(4, 2048, { message: lengthValidationMessage })
	profileImage!: string;

	/**
	 * 서버를 통해 한 번 전처리된 이미지
	 * example is @link {https://folder/test.jpg}
	 *
	 * @minLength 4
	 * @maxLength 2048
	 */
	@Column('varchar', { length: 2048, nullable: true })
	@ApiProperty()
	@IsNotEmpty({
		message: notEmptyValidationMessage,
	})
	@IsString({
		message: stringValidationMessage,
	})
	@Length(4, 2048, { message: lengthValidationMessage })
	coverImage!: string;

	@Column({ type: 'varchar', length: 30, nullable: true })
	@ApiProperty()
	@IsOptional()
	@MaxLength(30, { message: maxLengthValidationMessage })
	socialType?: 'kakao' | 'google' | 'naver';

	@Column({ type: 'varchar', length: 60, nullable: true })
	@ApiProperty()
	@IsOptional()
	@MaxLength(60, { message: maxLengthValidationMessage })
	refreshToken?: string;

	@OneToMany(() => FamEntity, (fa) => fa.member)
	memberGroups?: FamEntity[];

	@OneToMany(() => LikeFeedEntity, (lf) => lf.member)
	memberLikesFeeds?: LikeFeedEntity[];

	@OneToMany(() => FeedEntity, (fe) => fe.member)
	memberCreateFeeds?: FeedEntity[];

	// comment
	@OneToMany(() => CommentEntity, (cm) => cm.member)
	memberCreateComments?: CommentEntity[];

	// comment-like
	@OneToMany(() => LikeCommentEntity, (lkc) => lkc.member)
	memberLikesComments?: LikeCommentEntity[];

	//schedule
	@OneToMany(() => ScheduleEntity, (sch) => sch.member)
	memberCreateSchedules?: ScheduleEntity[];

	// message
	@OneToMany(() => MessageEntity, (fm) => fm.member)
	messages?: MessageEntity[];

	// member-chat
	@OneToMany(() => MemberChatEntity, (fmc) => fmc.member)
	memberEnterChats?: MemberChatEntity[];
}
