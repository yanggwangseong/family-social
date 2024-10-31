import React, { FC } from 'react';
import styles from './NotificationItem.module.scss';
import Image from 'next/image';
import { NotificationItemProps } from './notification-item.interface';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';
import { useRouter } from 'next/router';
import { MENTION_MATCH_PATTERN } from '@/constants/mention-match-pattern.const';
import ProfileHoverContainerModal from '../../profile-hover-container-modal/ProfileHoverContainerModal';
import { useHover } from '@/hooks/useHover';
import { formatDateDistance } from '@/utils/format-date-distance';

const NotificationItem: FC<NotificationItemProps> = ({
	notificationItem,
	isDescription = false,
	index,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	const router = useRouter();

	const handleFeedDetailPage = (feedId: string) => {
		router.push(`/feeds/${feedId}`);
	};

	const existsMentionDescription = (text: string) => {
		const parts = text.split(MENTION_MATCH_PATTERN);
		return parts.map((part, index) => {
			if (index % 3 === 1) {
				const name = parts[index];

				return <div key={index}>{`@${name}`}</div>;
			} else if (index % 3 === 2) {
				return '';
			} else {
				return part;
			}
		});
	};

	return (
		<motion.div
			{...easeOutAnimation(index)}
			onClick={() => {
				notificationItem.notificationFeedId &&
					handleFeedDetailPage(notificationItem.notificationFeedId);
			}}
		>
			<div
				className={styles.notification_item_container}
				id={notificationItem.id}
			>
				<ProfileHoverContainerModal
					member={notificationItem.sender}
					handleMouseOver={handleMouseOver}
					handleMouseOut={handleMouseOut}
					isHovering={isHovering}
				/>

				<div className={styles.description_container}>
					<div className={styles.notification_title}>
						{notificationItem.notificationTitle}
					</div>
					{isDescription && (
						<div className={styles.notification_description}>
							{existsMentionDescription(
								notificationItem.notificationDescription,
							)}
						</div>
					)}
					<div className={styles.notification_date}>
						{formatDateDistance(notificationItem.createdAt)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default NotificationItem;
