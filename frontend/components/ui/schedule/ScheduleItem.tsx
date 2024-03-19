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
import { LayerMode } from 'types';
import { useRouter } from 'next/router';

const ScheduleItem: FC<{ schedule: ScheduleResponse }> = ({ schedule }) => {
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
		setIsScheduleId(schedule.id);
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
		<div
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
				<div className={styles.contents_top_container}>
					<div>
						<div className={styles.d_day}>D-248</div>
					</div>
					{isUpdateTitle ? (
						<ScheduleUpdateTitle
							handleUpdateTitle={handleUpdateTitle}
							scheduleId={schedule.id}
						></ScheduleUpdateTitle>
					) : (
						<>
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
					<div
						className={styles.setting_container}
						ref={settingModalWrapperRef}
					>
						<BsThreeDots
							size={24}
							onClick={e => {
								e.stopPropagation();
								handleClickSettingModal();
							}}
						/>
						{isOpenSetting && (
							<ToggleModal
								list={ScheduleSettingMenu}
								onClose={handleCloseSettingModal}
								direction="right"
							/>
						)}
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
