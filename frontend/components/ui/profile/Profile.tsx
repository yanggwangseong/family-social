import React, { FC } from 'react';
import styles from './Profile.module.scss';
import FeedPublicSelect from '../select/FeedPublicSelect';
import { Union, feedPublicSelectOptions } from 'types';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import MentionView from '../mention/mention-view/MentionView';
import DirectChatMembers from '../chat/direct-chat-members/DirectChatMembers';
import { CommentsResponse } from '@/shared/interfaces/comment.interface';

import ChatDescription from '../chat/ChatDescription';
import CustomButton from '../button/custom-button/CustomButton';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';

const Profile: FC<{
	chat?: ChatListResponse;
	comment?: CommentsResponse;
	profileImage?: string;
	username?: string;
	email?: string;
	role?: string;
	isPublic?: Union<typeof feedPublicSelectOptions>;
	onChageIsPublic?: (status: Union<typeof feedPublicSelectOptions>) => void;
	isDirectChat?: boolean;
	handleAddMember?: (member: SearchMemberResponse) => void;
	searchMember?: SearchMemberResponse;
}> = ({
	chat,
	comment,
	profileImage,
	username,
	email,
	role,
	isPublic,
	onChageIsPublic,
	isDirectChat,
	handleAddMember,
	searchMember,
}) => {
	return (
		<div className={styles.profile_container}>
			<DirectChatMembers chat={chat} searchMember={searchMember} />

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
			{isDirectChat && searchMember && handleAddMember && (
				<div className={styles.direct_chat}>
					<CustomButton
						type="button"
						className="bg-customOrange text-customDark text-sm
                            font-bold border border-solid border-customDark w-full 
                            rounded hover:opacity-80 py-2 px-4"
						onClick={() => handleAddMember(searchMember)}
					>
						추가
					</CustomButton>
				</div>
			)}
			{chat && <ChatDescription chat={chat} />}
		</div>
	);
};

export default Profile;
