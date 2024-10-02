import React, { FC } from 'react';
import styles from './GroupProfile.module.scss';
import Image from 'next/image';
import { GroupProfileProps } from './group-profile.interface';
import cn from 'classnames';
import { MdOutlineCancel } from 'react-icons/md';

const GroupProfile: FC<GroupProfileProps> = ({
	group,
	onSelectedGroup,
	isSelecteGroup,
}) => {
	return (
		<div
			className={cn(styles.profile_container, {
				[styles.isSelected]: group.id === isSelecteGroup,
			})}
			onClick={() => onSelectedGroup && onSelectedGroup(group.id)}
		>
			<div>
				<div className={styles.profile_img_container}>
					<Image
						width={40}
						height={40}
						src={group.groupCoverImage ?? '/images/banner/sm/group-base-sm.png'}
						alt="img"
					></Image>
				</div>
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
