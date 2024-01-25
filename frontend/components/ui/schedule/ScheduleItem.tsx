import React, { FC } from 'react';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import styles from './ScheduleItem.module.scss';
import { ScheduleResponse } from '@/shared/interfaces/schedule.interface';
import { TranslateDateFormat } from '@/utils/translate-date-format';

const ScheduleItem: FC<{ schedule: ScheduleResponse }> = ({ schedule }) => {
	return (
		<div className={styles.schedule_card_container} id={schedule.id}>
			<div className={styles.img_container}>
				<Image
					fill
					src={schedule.scheduleImage ?? '/images/banner/group-base.png'}
					alt="banner"
				></Image>
			</div>
			<div className={styles.schedule_card_contents_container}>
				<div className={styles.contents_top_container}>
					<div className={styles.d_day}>D-248</div>
					<div className={styles.title}>{schedule.scheduleName}</div>
					<div className={styles.setting_container}>
						<BsThreeDots size={24} />
					</div>
				</div>
				<div
					className={styles.schedule_periods}
				>{`${schedule.startPeriod} ~ ${schedule.endPeriod}`}</div>
				<div className={styles.update_date}>{`최근 수정일 ${TranslateDateFormat(
					new Date(schedule.updatedAt),
					'yyyy-MM-dd',
				)}`}</div>
			</div>
		</div>
	);
};

export default ScheduleItem;
