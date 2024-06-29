import React, { FC } from 'react';
import styles from './GroupEventItem.module.scss';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';
import { GroupEventItemResponse } from '@/shared/interfaces/group-event.interface';
import Image from 'next/image';
import DDay from '@/ui/d-day/DDay';
import Profile from '../../profile/Profile';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { BsThreeDots } from 'react-icons/bs';
import { PiCakeDuotone } from 'react-icons/pi';
import EventTypeIcon from '../../event-type-icon/EventTypeIcon';

const GroupEventItem: FC<{
	index: number;
	page: number;
	data: GroupEventItemResponse;
}> = ({ index, page, data }) => {
	return (
		<>
			<motion.div {...easeOutAnimation(index)}>
				<div className={styles.group_event_container}>
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
							<DDay day={'5'} />
							<EventTypeIcon Icon={PiCakeDuotone} iconSize={24} />
							<div className={styles.title}>{data.eventName}</div>
						</div>

						<Profile
							username={data.eventOrganizer.username}
							profileImage={data.eventOrganizer.profileImage}
						/>

						<motion.div {...INLINEBUTTONGESTURE} className={styles.setting_btn}>
							<BsThreeDots size={24} />
						</motion.div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default GroupEventItem;
