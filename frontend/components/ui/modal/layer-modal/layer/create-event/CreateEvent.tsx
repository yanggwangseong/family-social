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
import { SubmitHandler, useForm } from 'react-hook-form';
import Field from '@/components/ui/field/Field';
import FieldWithTextarea from '@/components/ui/field/field-area/FieldArea';
import FieldTime from '@/components/ui/field/field-time/FieldTime';
import Calendar from '@/components/ui/calendar/Calendar';

const CreateEvent: FC = () => {
	const [isEventImage, setIsEventImage] = useState<string>();
	const FileInput = useRef<HTMLInputElement | null>(null);

	const [isEventStartDate, setIsEventStartDate] = useState<Date>(new Date());

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
		control,
	} = useForm<{
		eventName: string;
		eventDescription: string;
		eventStartTime: string;
	}>({
		mode: 'onChange',
	});

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

	const handleChangeDate = (date: Date | [Date | null, Date | null]) => {
		if (date instanceof Date) {
			console.log(date);
			setIsEventStartDate(date);
		}
	};

	const onSubmit: SubmitHandler<{
		eventName: string;
		eventDescription: string;
		eventStartTime: string;
	}> = data => {
		console.log('submit?');
		//updateGroupSync(data);
	};

	return (
		<LayerModalVariantWrapper className={styles.create_event_container}>
			<form className={styles.create_form} onSubmit={handleSubmit(onSubmit)}>
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

						{/* 프로필 */}
						<Profile username="양광성" />

						<div className={styles.field_container}>
							<Field
								fieldClass={'inline_input'}
								labelText={'이벤트 이름'}
								{...register('eventName', {
									required: '이벤트 이름은 필수입니다!',
									minLength: {
										value: 2,
										message: '최소 이름은 2자 이상입니다.',
									},
								})}
								placeholder="이벤트 이름을 입력 해주세요!"
								error={errors.eventName}
							></Field>
							<FieldWithTextarea
								fieldClass={'inline_textarea'}
								labelText={'이벤트 설명'}
								{...register('eventDescription', {
									maxLength: {
										value: 1000,
										message: '최대 1000자까지 가능합니다',
									},
								})}
								placeholder="상세 정보를 추가하세요"
								error={errors.eventDescription}
							></FieldWithTextarea>

							{/* <Field
								fieldClass={'inline_input'}
								labelText={'시작시간'}
								{...register('eventStartTime', {
									required: '시작시간을 필수입니다!',
								})}
								className="w-full  md:text-base text-sm"
								type="time"
								error={errors.eventStartTime}
							/> */}

							{/* 캘린더 */}
							<Calendar
								startDate={isEventStartDate}
								handleChangeDate={handleChangeDate}
								datePickerOptions={{
									withPortal: true,
									minDate: new Date(),
									selected: isEventStartDate,
								}}
							/>
							<FieldTime
								control={control}
								name="eventStartTime"
								labelText="시작시간"
								validationOptions={{
									required: '시작시간을 필수입니다!',
								}}
							></FieldTime>
						</div>
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
						disabled={!isValid}
					>
						이벤트 만들기
					</CustomButton>
				</div>
			</form>
		</LayerModalVariantWrapper>
	);
};

export default CreateEvent;
