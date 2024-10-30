import React, { FC, useRef } from 'react';
import styles from './GroupSearchCard.module.scss';
import GroupProfile from '../../profile/group-profile/GroupProfile';
import { GroupProfileResponse } from '@/shared/interfaces/group.interface';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
import { useModal } from '@/hooks/useModal';
import ToggleModal from '../../modal/ToggleModal';
import { GroupDiscoverSettingMenu } from '../../modal/toggle-menu.constants';

const GroupSearchCard: FC<{ group: GroupProfileResponse }> = ({ group }) => {
	const settingModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenSetting,
		handleToggleModal: handleCloseSettingModal,
	} = useModal(settingModalWrapperRef);

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
						initial={false}
						animate={isOpenSetting ? 'open' : 'closed'}
						ref={settingModalWrapperRef}
					>
						<BsThreeDots
							className="w-full"
							size={24}
							onClick={handleCloseSettingModal}
						/>

						<ToggleModal
							list={GroupDiscoverSettingMenu}
							onClose={handleCloseSettingModal}
							direction="right"
							groupId={group.id}
						/>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default GroupSearchCard;
