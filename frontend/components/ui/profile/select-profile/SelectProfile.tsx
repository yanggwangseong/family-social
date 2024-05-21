import React, { FC } from 'react';
import styles from './SelectProfile.module.scss';
import Image from 'next/image';
import { AiOutlineCheck } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { MembersBelongToGroupResponse } from '@/shared/interfaces/member.interface';
import cn from 'classnames';

const SelectProfile: FC<{
	belongToMember: MembersBelongToGroupResponse;
	selected: boolean;
	handleSelectedMember: (famId: string, isSelected: boolean) => void;
}> = ({ belongToMember, selected, handleSelectedMember }) => {
	return (
		<motion.div
			className={styles.container}
			{...INLINEBUTTONGESTURE}
			onClick={() => handleSelectedMember(belongToMember.id, selected)}
		>
			<div
				className={cn(styles.check_icon_container, {
					[styles.active]: !!selected,
				})}
			>
				<AiOutlineCheck size={14} color={selected ? '#0a0a0a' : undefined} />
			</div>

			<div className={styles.profile_container}>
				<div className={styles.profile_img_container}>
					<Image
						className={styles.profile_img}
						fill
						src={
							belongToMember.member.profileImage ??
							'/images/profile/profile.png'
						}
						alt="img"
					></Image>
				</div>
				<div className={styles.profile_right_container}>
					<div className={styles.profile_username}>
						{belongToMember.member.username}
					</div>
					<div className={styles.profile_role}>{belongToMember.role}</div>
				</div>
			</div>
		</motion.div>
	);
};

export default SelectProfile;
