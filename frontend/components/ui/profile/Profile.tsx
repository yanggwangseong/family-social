import React, { FC } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';
import FeedPublicSelect from '../select/FeedPublicSelect';
import { Union, feedPublicSelectOptions } from 'types';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import MentionView from '../mention/mention-view/MentionView';
import { CommentsResponse } from '@/shared/interfaces/comment.interface';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const Profile: FC<{
	chat?: ChatListResponse;
	comment?: CommentsResponse;
	profileImage?: string;
	username?: string;
	email?: string;
	role?: string;
	isPublic?: Union<typeof feedPublicSelectOptions>;
	onChageIsPublic?: (status: Union<typeof feedPublicSelectOptions>) => void;
}> = ({
	chat,
	comment,
	profileImage,
	username,
	email,
	role,
	isPublic,
	onChageIsPublic,
}) => {
	// 채팅 멤버 렌더링 함수
	const renderChatMembers = () => {
		if (!chat || chat.chatMembers.length < 1) {
			return (
				<Image
					className="rounded-full"
					fill
					src={profileImage ?? '/images/profile/profile.png'}
					alt="img"
				/>
			);
		}

		const filteredMembers = chat.chatMembers.filter(
			member => member.memberId !== chat.targetMemberId,
		);

		// 멤버가 1명일 경우
		if (filteredMembers.length === 1) {
			return (
				<Image
					className="rounded-full"
					fill
					src={
						filteredMembers[0].member.profileImage ??
						'/images/profile/profile.png'
					}
					alt="img"
				/>
			);
		}

		const style = (index: number) => {
			if (filteredMembers.length === 2) {
				return {
					zIndex: 4 - index,
					right: `${index * 20}px`,
					bottom: `${index * 20}px`,
				};
			} else if (filteredMembers.length === 3) {
				if (index === 0) {
					return {
						zIndex: 4 - index,
						right: '10px',
						bottom: '10px',
					};
				} else if (index === 1) {
					return {
						zIndex: 4 - index,
						right: `${index * 28}px`,
						bottom: `${index * 12}px`,
					};
				} else if (index === 2) {
					return {
						zIndex: 4 - index,
						right: `${index * 9}px`,
						bottom: `${index * 14}px`,
					};
				}
			} else if (filteredMembers.length === 4) {
				if (index === 0) {
					return {
						zIndex: 4 - index,
						right: '5px',
						bottom: '5px',
					};
				} else if (index === 1) {
					return {
						zIndex: 4 - index,
						right: `${index * 25}px`,
						bottom: `${index * 10}px`,
					};
				} else if (index === 2) {
					return {
						zIndex: 4 - index,
						right: `${index * 8}px`,
						bottom: `${index * 12}px`,
					};
				} else if (index === 3) {
					return {
						zIndex: 4 - index,
						right: `${index * 6}px`,
						bottom: `${index * 8}px`,
					};
				}
			}
		};

		// 멤버가 2명 이상일 경우
		return (
			<div className={styles.chat_members_container}>
				{filteredMembers.slice(0, 4).map((member, index) => (
					<div
						key={index}
						className={styles.chat_member_profile}
						style={style(index)}
					>
						<Image
							className="rounded-full"
							fill
							src={member.member.profileImage ?? '/images/profile/profile.png'}
							alt={`Member ${index + 1}`}
						/>
					</div>
				))}
			</div>
		);
	};
	return (
		<div className={styles.profile_container}>
			<div className={styles.profile_img_parent_container}>
				<div className={styles.profile_img_container}>
					{renderChatMembers()}
				</div>
			</div>
			<div>
				{comment && (
					<>
						<div className={styles.profile_comment_username}>
							{comment.member.username}
						</div>
						<div className={styles.profile_comment_contents}>
							<MentionView
								contents={comment.commentContents}
								mentions={comment.mentions}
							></MentionView>
						</div>
					</>
				)}

				{username && <div className={styles.profile_username}>{username}</div>}
				{email && <div className={styles.profile_email}>{email}</div>}
				{isPublic && (
					<FeedPublicSelect
						onChageIsPublic={onChageIsPublic}
						isPublic={isPublic}
					/>
				)}
				{role && <div className={styles.profile_role}>관리자</div>}
			</div>
			{chat && (
				<div className={styles.chat_container}>
					<div className={styles.chat_card_container}>
						<div className={styles.chat_top_container}>
							<div className={styles.chat_username}>
								{chat.recentMessage.memberName}
							</div>
							<div className={styles.chat_join_member_count}>
								{chat.joinMemberCount > 2 && chat.joinMemberCount}
							</div>
							<div className={styles.chat_date}>
								{format(parseISO(chat.recentMessage.createdAt), 'a h:mm', {
									locale: ko,
								})}
							</div>
						</div>
						<div className={styles.chat_message}>
							{chat.recentMessage.message}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
