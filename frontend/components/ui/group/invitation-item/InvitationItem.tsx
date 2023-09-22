import React, { FC } from 'react';
import GroupProfile from '@/ui/profile/group-profile/GroupProfile';
import CustomButton from '@/ui/button/custom-button/CustomButton';
import styles from './InvitationItem.module.scss';
import { InvitationItemProps } from './invitation-item.interface';

const InvitationItem: FC<InvitationItemProps> = ({
	invitation,
	onAcceptInvitation,
	onRejectInvitation,
}) => {
	const data = {
		groupId: invitation.group.id,
		memberId: invitation.member.id,
		famId: invitation.id,
	};
	return (
		<div className={styles.invitation_item_container}>
			<div className={styles.group_profile_container}>
				<div className={styles.group_profile_subject_container}>
					<div className={styles.group_profile_subject}>그룹</div>
				</div>
				{/* 그룹 프로필 */}
				<GroupProfile group={invitation.group}></GroupProfile>
			</div>

			<div className={styles.message_container}>
				<div>
					회원님을 {invitation.group.groupName} 그룹에 가입하도록 초대했습니다.
				</div>
			</div>
			<div className={styles.invitation_btn_container}>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customDark text-customOrange 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px] w-full hover:opacity-80"
					onClick={() => onAcceptInvitation(data)}
				>
					수락
				</CustomButton>

				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-basic text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px] w-full hover:bg-gray-200"
					onClick={() => onRejectInvitation(data)}
				>
					거절
				</CustomButton>
			</div>
		</div>
	);
};

export default InvitationItem;
