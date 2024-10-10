import React, { FC } from 'react';
import styles from './SharedMembers.module.scss';
import { SharedMembersProps } from './shared-members.interface';
import { useHover } from '@/hooks/useHover';
import { AnimatePresence, motion } from 'framer-motion';
import SharedMembersHoverModal from '../modal/shared-members-hover-modal/SharedMembersHoverModal';
import ProfileHoverContainerModal from '../modal/profile-hover-container-modal/ProfileHoverContainerModal';

const SharedMembers: FC<SharedMembersProps> = ({
	sharedMembers,
	sharedGroup,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	return (
		<div className={styles.container}>
			<ProfileHoverContainerModal
				group={sharedGroup}
				member={sharedMembers[0].member}
				handleMouseOver={handleMouseOver}
				handleMouseOut={handleMouseOut}
				isHovering={isHovering}
			/>

			<div
				className={styles.shared_text}
				onMouseOver={e => {
					handleMouseOver(2);
				}}
				onMouseOut={e => {
					handleMouseOut();
				}}
			>
				{`${sharedMembers.length}명에게 공유됨`}
				{isHovering === 2 && (
					<AnimatePresence key={2}>
						<motion.div
							key={2}
							className={styles.mention_view_modal}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
							exit={{ opacity: 0, transition: { duration: 1 } }}
						>
							<SharedMembersHoverModal sharedMembers={sharedMembers} />
						</motion.div>
					</AnimatePresence>
				)}
			</div>
		</div>
	);
};

export default SharedMembers;
