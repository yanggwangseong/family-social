import React, { FC } from 'react';
import styles from './GroupSearchCard.module.scss';
import GroupProfile from '../../profile/group-profile/GroupProfile';
import { GroupProfileResponse } from '@/shared/interfaces/group.interface';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';

const GroupSearchCard: FC<{ group: GroupProfileResponse }> = ({ group }) => {
	return (
		<div className={styles.group_item_card}>
			<div className={styles.group_item_card_container}>
				<GroupProfile group={group} />
				<div className={styles.group_item_card_button_container}>
					<motion.div
						className={styles.group_item_card_button_container_button}
						{...INLINEBUTTONGESTURE}
					>
						<Link
							href={`/groups/${group.id}`}
							className={styles.group_item_card_button}
						>
							그룹 보기
						</Link>
					</motion.div>
					<motion.div
						{...INLINEBUTTONGESTURE}
						className={styles.group_icon_container}
					>
						<BsThreeDots size={24} />
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default GroupSearchCard;
