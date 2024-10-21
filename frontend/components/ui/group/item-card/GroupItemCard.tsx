import React, { FC } from 'react';
import styles from './GroupItemCard.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import GroupProfile from '@/ui/profile/group-profile/GroupProfile';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { GroupItemCardProps } from './group-item-card.interface';

const GroupItemCard: FC<GroupItemCardProps> = ({ group }) => {
	return (
		<div className={styles.group_item_card}>
			<div className={styles.group_item_card_container}>
				<GroupProfile group={group.group} />
				<div className={styles.group_item_card_button_container}>
					<motion.div
						className={styles.group_item_card_button_container_button}
						{...INLINEBUTTONGESTURE}
					>
						<Link
							href={`/groups/${group.group.id}`}
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

export default GroupItemCard;
