import React, { ChangeEvent, FC, useRef, useState } from 'react';
import styles from './CreateEvent.module.scss';

import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import Image from 'next/image';
import { PiPencilDuotone } from 'react-icons/pi';
import Profile from '@/components/ui/profile/Profile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { useMutation } from 'react-query';
import { MediaService } from '@/services/media/media.service';

const CreateEvent: FC = () => {
	const [isEventImage, setIsEventImage] = useState<string>();
	const FileInput = useRef<HTMLInputElement | null>(null);

	const { mutateAsync } = useMutation(
		['group-event-image-upload'],
		async (file: File) =>
			await MediaService.uploadGroupEventImage(
				file,
				'75aca3da-1dac-48ef-84b8-cdf1be8fe37d',
			),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `이미지 업로드에 성공 하였습니다.`, '확인');
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const handleGroupCoverImageUpload = async (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const uploadedFiles: File[] = Array.from(event.target.files || []);

		const url = await mutateAsync(uploadedFiles[0]);

		setIsEventImage(url[0]);
	};

	const handleClick = () => {
		FileInput.current!.click();
	};

	return (
		<LayerModalVariantWrapper className={styles.create_event_container}>
			<div className={styles.contents_container}>
				<div className={styles.top_container}>
					<div className={styles.banner_img_container}>
						<Image
							className={styles.banner_img}
							fill
							src={'/images/banner/group-base.png'}
							alt="banner"
						></Image>
						<div className={styles.banner_edit_btn}>
							<PiPencilDuotone size={22} />
							<button className={styles.btn_text} onClick={handleClick}>
								수정
							</button>

							<input
								type="file"
								id="fileUpload"
								style={{ display: 'none' }}
								onChange={handleGroupCoverImageUpload}
								ref={FileInput}
							/>
						</div>
					</div>
					<Profile username="양광성" />
				</div>
			</div>
			<div className={styles.button_container}>
				<CustomButton
					type="submit"
					className="ml-auto bg-customOrange text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-full hover:bg-orange-500
								"
				>
					이벤트 만들기
				</CustomButton>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default CreateEvent;
