import React, { FC, useRef } from 'react';
import styles from './GroupEventItem.module.scss';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';
import Image from 'next/image';
import DDay from '@/ui/d-day/DDay';
import Profile from '../../profile/Profile';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { BsThreeDots } from 'react-icons/bs';
import { PiCakeDuotone } from 'react-icons/pi';
import EventTypeIcon from '../../event-type-icon/EventTypeIcon';
import { useModal } from '@/hooks/useModal';
import { GroupItemProps } from './group-item.interface';
import ToggleModal from '../../modal/ToggleModal';
import { GroupEventSettingMenu } from '../../modal/toggle-menu.constants';
import { useRecoilState } from 'recoil';
import { groupEventIdAtom } from '@/atoms/groupEventIdAtom';
import { calculateDDay } from '@/utils/calculate-dday';

const GroupEventItem: FC<GroupItemProps> = ({ index, page, data }) => {
	const ModalWrapperRef = useRef<HTMLDivElement>(null);

	const [, setIsGroupEventId] = useRecoilState(groupEventIdAtom);

	const { isShowing, handleToggleModal } = useModal(ModalWrapperRef);

	const handleClickSettingModal = () => {
		handleToggleModal();
		setIsGroupEventId({
			groupId: data.eventGroupId,
			groupEventId: data.id,
		});
	};

	return (
		<>
			<motion.div {...easeOutAnimation(index)}>
				<div className={styles.group_event_container} id={data.id}>
					<div className={styles.group_event_img_container}>
						<Image
							fill
							src={data.eventCoverImage ?? '/images/banner/group-base.png'}
							alt="somenail"
						></Image>
					</div>
					<div className={styles.description_container}>
						{/* d-day */}
						<div className={styles.d_day_container}>
							<DDay day={calculateDDay(data.eventStartDate)} />
							<EventTypeIcon Icon={PiCakeDuotone} iconSize={24} />
							<div className={styles.title}>{data.eventName}</div>
						</div>

						<Profile
							username={data.eventOrganizer.username}
							searchMember={data.eventOrganizer}
						/>

						<motion.div
							className={styles.toggle_menu_icon_container}
							initial={false}
							animate={isShowing ? 'open' : 'closed'}
							ref={ModalWrapperRef}
						>
							<motion.div
								{...INLINEBUTTONGESTURE}
								className={styles.setting_btn}
							>
								<BsThreeDots
									size={24}
									onClick={e => {
										e.stopPropagation();
										handleClickSettingModal();
									}}
								/>
							</motion.div>
							<ToggleModal
								list={GroupEventSettingMenu}
								onClose={handleToggleModal}
							/>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default GroupEventItem;
