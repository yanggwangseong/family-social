import React, { FC, useRef, useState } from 'react';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import styles from './ScheduleItem.module.scss';
import { ScheduleResponse } from '@/shared/interfaces/schedule.interface';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import { useModal } from '@/hooks/useModal';
import ToggleModal from '../modal/ToggleModal';
import { ScheduleSettingMenu } from '../modal/toggle-menu.constants';
import { scheduleIdAtom } from '@/atoms/scheduleIdAtom';
import { useRecoilState } from 'recoil';
import { PiPencilDuotone } from 'react-icons/pi';
import ScheduleUpdateTitle from './update-title/UpdateTitle';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import cn from 'classnames';
import { LayerMode } from 'types';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { easeOutAnimation } from '@/utils/animation/ease-out';
import SharedMembers from '../shared-members/SharedMembers';
import DDay from '../d-day/DDay';
import { formatDateDistance } from '@/utils/format-date-distance';
import { calculateDDay } from '@/utils/calculate-dday';

const ScheduleItem: FC<{ schedule: ScheduleResponse; index: number }> = ({
	schedule,
	index,
}) => {
	const router = useRouter();

	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isUpdateTitle, setIsUpdateTitle] = useState<boolean>(false);
	const [, setIsScheduleId] = useRecoilState(scheduleIdAtom);
	const settingModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenSetting,
		handleToggleModal: handleCloseSettingModal,
	} = useModal(settingModalWrapperRef);

	const handleClickSettingModal = () => {
		handleCloseSettingModal();
		setIsScheduleId({
			groupId: schedule.groupId,
			scheduleId: schedule.id,
		});
	};

	const handleUpdateTitle = () => {
		setIsUpdateTitle(!isUpdateTitle);
	};

	const handleUploadThumbnailImage = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '썸네일 업로드',
			layer: LayerMode.scheduleThumbnailImage,
		});
	};

	const handleChangePageScheduleDetail = (scheduleId: string) => {
		router.push(`/schedules/${scheduleId}`);
	};

	return (
		<motion.div
			{...easeOutAnimation(index)}
			className={styles.schedule_card_container}
			id={schedule.id}
			onClick={() => handleChangePageScheduleDetail(schedule.id)}
		>
			<div className={styles.img_container}>
				<Image
					fill
					src={schedule.scheduleImage ?? '/images/banner/group-base.png'}
					alt="banner"
					onClick={e => {
						e.stopPropagation();
						handleUploadThumbnailImage();
					}}
				></Image>
			</div>
			<div className={styles.schedule_card_contents_container}>
				<div
					className={cn(styles.contents_top_container, {
						[styles.isMobileUpdate]: !!isUpdateTitle,
					})}
				>
					<div className={styles.contents_top_container}>
						{isUpdateTitle ? (
							<ScheduleUpdateTitle
								handleUpdateTitle={handleUpdateTitle}
								scheduleId={schedule.id}
							></ScheduleUpdateTitle>
						) : (
							<>
								{/* d-day */}
								<DDay day={calculateDDay(schedule.startPeriod)} />
								<div className={styles.title}>{schedule.scheduleName}</div>

								<div
									className={styles.title_update_icon_container}
									onClick={e => {
										e.stopPropagation();
										handleUpdateTitle();
									}}
								>
									<PiPencilDuotone size={18} color="#0a0a0a" />
								</div>
							</>
						)}
					</div>

					<motion.div
						className={styles.setting_container}
						initial={false}
						animate={isOpenSetting ? 'open' : 'closed'}
						ref={settingModalWrapperRef}
					>
						<BsThreeDots
							size={24}
							onClick={e => {
								e.stopPropagation();
								handleClickSettingModal();
							}}
						/>

						<ToggleModal
							list={ScheduleSettingMenu}
							onClose={handleCloseSettingModal}
							direction="right"
						/>
					</motion.div>
				</div>

				<div
					className={styles.schedule_periods}
				>{`${schedule.startPeriod} ~ ${schedule.endPeriod}`}</div>

				<div className={styles.bottom_container}>
					{/* 공유된 멤버 */}
					<SharedMembers
						sharedMembers={schedule.sharedMembers}
						sharedGroup={schedule.group}
					/>
					<div className={styles.update_date}>
						{formatDateDistance(schedule.updatedAt)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ScheduleItem;
