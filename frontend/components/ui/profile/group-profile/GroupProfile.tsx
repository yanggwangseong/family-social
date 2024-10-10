import React, { FC } from 'react';
import styles from './GroupProfile.module.scss';
import { GroupProfileProps } from './group-profile.interface';
import cn from 'classnames';
import { MdOutlineCancel } from 'react-icons/md';
import { useHover } from '@/hooks/useHover';
import ProfileHoverContainerModal from '../../modal/profile-hover-container-modal/ProfileHoverContainerModal';

const GroupProfile: FC<GroupProfileProps> = ({
	group,
	onSelectedGroup,
	isSelecteGroup,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	return (
		<div
			className={cn(styles.profile_container, {
				[styles.isSelected]: group.id === isSelecteGroup,
			})}
			onClick={() => onSelectedGroup && onSelectedGroup(group.id)}
		>
			<div>
				<ProfileHoverContainerModal
					group={group}
					handleMouseOver={handleMouseOver}
					handleMouseOut={handleMouseOut}
					isHovering={isHovering}
				/>
			</div>
			<div>
				<div className={styles.profile_username}>{group.groupName}</div>
				<div className={styles.profile_description}>
					{group.groupDescription}
				</div>
			</div>
			{group.id === isSelecteGroup && (
				<div
					className={styles.group_selected_cancle}
					onClick={e => {
						e.stopPropagation(); // 이벤트 버블링 중지
						onSelectedGroup && onSelectedGroup('');
					}}
				>
					<MdOutlineCancel size={28} />
				</div>
			)}
		</div>
	);
};

export default GroupProfile;
