import React, { FC } from 'react';
import styles from './DirectChatMembers.module.scss';
import Image from 'next/image';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import { useHover } from '@/hooks/useHover';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';
import ProfileHoverContainerModal from '../../modal/profile-hover-container-modal/ProfileHoverContainerModal';

interface DirectChatMembersProps {
	chat?: ChatListResponse;
	searchMember?: SearchMemberResponse;
}

const DirectChatMembers: FC<DirectChatMembersProps> = ({
	chat,
	searchMember,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	if (!chat || chat.chatMembers.length < 1) {
		return (
			// <div className={styles.profile_img_parent_container}>
			// 	<div className={styles.profile_img_container}>
			// 		<Image
			// 			className="rounded-full"
			// 			fill
			// 			src={profileImage ?? '/images/profile/profile.png'}
			// 			alt="img"
			// 		/>
			// 	</div>
			// </div>
			<ProfileHoverContainerModal
				member={searchMember}
				handleMouseOver={handleMouseOver}
				handleMouseOut={handleMouseOut}
				isHovering={isHovering}
			/>
		);
	}

	const filteredMembers = chat.chatMembers.filter(
		member => member.memberId !== chat.targetMemberId,
	);

	// 멤버가 1명일 경우
	if (filteredMembers.length === 1) {
		return (
			<div className={styles.profile_img_parent_container}>
				<div className={styles.profile_img_container}>
					<Image
						className="rounded-full"
						fill
						src={
							filteredMembers[0].member.profileImage ??
							'/images/profile/profile.png'
						}
						alt="img"
					/>
				</div>
			</div>
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
		<div className={styles.profile_img_parent_container}>
			<div className={styles.profile_img_container}>
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
								src={
									member.member.profileImage ?? '/images/profile/profile.png'
								}
								alt={`Member ${index + 1}`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DirectChatMembers;
