import React, {
	ChangeEvent,
	FC,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import styles from './CreateEvent.module.scss';

import Image from 'next/image';
import { PiPencilDuotone } from 'react-icons/pi';
import Profile from '@/components/ui/profile/Profile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { MediaService } from '@/services/media/media.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import Field from '@/components/ui/field/Field';
import FieldWithTextarea from '@/components/ui/field/field-area/FieldArea';
import FieldTime from '@/components/ui/field/field-time/FieldTime';
import Calendar from '@/components/ui/calendar/Calendar';

import { LayerMode, Union, eventOptionsLists } from 'types';
import ScheduleEventTypeSelect from '@/components/ui/select/schedule/event/ScheduleEventTypeSelect';

import { GroupEventService } from '@/services/group-event/group-event.service';
import {
	CreateGroupEventRequest,
	UpdateGroupEventRequest,
} from '@/shared/interfaces/group-event.interface';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { Notify } from 'notiflix';
import { TranslateDateFormat } from '@/utils/translate-date-format';

import {
	CreateEventFields,
	CreateEventProps,
	CreateEventPropsWithAuth,
} from './create-event.interface';
import { FormatDateToString } from '@/utils/formatDateToString';
import { useCreateMutation } from '@/hooks/useCreateMutation';
import { withAuthClientSideProps } from 'hoc/with-auth-client-side-props';

const CreateEvent: FC<CreateEventPropsWithAuth> = ({
	event,
	isGroupEventId,
	authData,
}) => {
	const [isEndDateOpen, setIsEndDateOpen] = useReducer(
		state => {
			return !state;
		},
		event && event.eventEndDate ? true : false,
	);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const [isEventImage, setIsEventImage] = useState<string>(
		event ? event.eventCoverImage : '/images/banner/group-base.png',
	);
	const FileInput = useRef<HTMLInputElement | null>(null);

	const [isEventStartDate, setIsEventStartDate] = useState<Date>(() => {
		if (event) {
			return FormatDateToString(event.eventStartDate);
		}
		return new Date();
	});

	const [isEventEndDate, setIsEventEndDate] = useState<Date>(() => {
		if (event && event.eventEndDate) {
			return FormatDateToString(event.eventEndDate);
		}
		return new Date();
	});

	const [isEventType, setIsEventType] = useState<
		Union<typeof eventOptionsLists>
	>(() => {
		if (event) {
			return event.eventType;
		}

		return 'BIRTHDAY';
	});

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
		control,
		setValue,
	} = useForm<CreateEventFields>({
		mode: 'onChange',
		defaultValues: {
			eventName: event ? event.eventName : '',
			eventDescription: event ? event.eventDescription : '',
			eventStartTime: event ? event.eventStartTime : '',
			eventEndTime: event ? event.eventEndTime : '',
		},
	});

	const { mutateAsync } = useCreateMutation(
		async (file: File) =>
			await MediaService.uploadGroupEventImage(
				file,
				'75aca3da-1dac-48ef-84b8-cdf1be8fe37d',
			),
		{
			mutationKey: ['group-event-image-upload'],
			onSuccess: data => {
				Loading.remove();
				Report.success('성공', `이미지 업로드에 성공 하였습니다.`, '확인');
			},
		},
	);

	const { mutateAsync: createGroupEventASync } = useCreateMutation(
		async (data: CreateGroupEventRequest) =>
			await GroupEventService.createGroupEvent(
				data,
				'75aca3da-1dac-48ef-84b8-cdf1be8fe37d',
			),
		{
			mutationKey: ['create-group-event'],
			onSuccess: data => {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '이벤트 생성 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'createEventAnimation',
					message: '새로운 이벤트가 생성 되었습니다',
				});
			},
		},
	);

	const { mutateAsync: updateGroupEventASync } = useCreateMutation(
		async (data: UpdateGroupEventRequest) =>
			await GroupEventService.updateGroupEvent(
				data,
				event!.eventGroupId,
				event!.id,
			),
		{
			mutationKey: ['update-group-event'],
			onSuccess: data => {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '이벤트 수정 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'createEventAnimation',
					message: '이벤트가 수정 되었습니다',
				});
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
			setIsEventStartDate(date);
		}
	};

	const handleChangeEndDate = (date: Date | [Date | null, Date | null]) => {
		if (date instanceof Date) {
			setIsEventEndDate(date);
		}
	};

	const onSubmit: SubmitHandler<CreateEventFields> = async data => {
		if (!isEventImage) {
			Notify.warning('이벤트 커버 이미지가 없습니다');
			return false;
		}

		if (!isGroupEventId.groupEventId) {
			await createGroupEventASync({
				...data,
				eventCoverImage: isEventImage,
				eventStartDate: TranslateDateFormat(isEventStartDate, 'yyyy-MM-dd'),
				eventEndDate: isEndDateOpen
					? TranslateDateFormat(isEventEndDate, 'yyyy-MM-dd')
					: undefined,
				eventType: isEventType,
			});
		}

		if (isGroupEventId.groupEventId) {
			await updateGroupEventASync({
				...data,
				eventCoverImage: isEventImage,
				eventStartDate: TranslateDateFormat(isEventStartDate, 'yyyy-MM-dd'),
				eventEndDate: isEndDateOpen
					? TranslateDateFormat(isEventEndDate, 'yyyy-MM-dd')
					: undefined,
				eventType: isEventType,
			});
		}
	};

	const handleChangeEventType = (option: Union<typeof eventOptionsLists>) => {
		setIsEventType(option);
	};

	useEffect(() => {
		if (!isEndDateOpen) {
			setValue('eventEndTime', undefined);
		}
	}, [isEndDateOpen, setValue]);

	return (
		<form className={styles.create_form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.contents_container}>
				<div className={styles.top_container}>
					<div className={styles.banner_img_container}>
						<Image
							className={styles.banner_img}
							fill
							src={isEventImage}
							alt="banner"
						></Image>
						<div className={styles.banner_edit_btn}>
							<PiPencilDuotone size={22} />
							<button
								type="button"
								className={styles.btn_text}
								onClick={handleClick}
							>
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

					<Profile username={authData.username} searchMember={authData} />

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

						<div className={styles.selectbox_wrap}>
							<div className={styles.label_text}>이벤트 타입</div>
							<ScheduleEventTypeSelect
								options={isEventType}
								onChangeEventType={handleChangeEventType}
							/>
						</div>

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

						<div className={styles.date_and_time_container}>
							{/* 캘린더 */}
							<div className={styles.wrap}>
								<div className={styles.label_text}>시작날짜</div>
								<Calendar
									startDate={isEventStartDate}
									handleChangeDate={handleChangeDate}
									datePickerOptions={{
										withPortal: true,
										minDate: new Date(),
										selected: isEventStartDate,
									}}
								/>
							</div>
							<div className={styles.wrap}>
								<div className={styles.label_text}>시작시간</div>
								<FieldTime
									control={control}
									name="eventStartTime"
									validationOptions={{
										required: '시작시간을 필수입니다!',
									}}
								></FieldTime>
							</div>
						</div>
						{!isEndDateOpen && (
							<div
								className={styles.date_toggle_btn}
								onClick={setIsEndDateOpen}
							>
								+ 종료 날짜 및 시간
							</div>
						)}

						{isEndDateOpen && (
							<>
								<div className={styles.date_and_time_container}>
									{/* 캘린더 */}
									<div className={styles.wrap}>
										<div className={styles.label_text}>종료날짜</div>
										<Calendar
											startDate={isEventEndDate}
											handleChangeDate={handleChangeEndDate}
											datePickerOptions={{
												withPortal: true,
												minDate: new Date(),
												selected: isEventEndDate,
											}}
										/>
									</div>
									<div className={styles.wrap}>
										<div className={styles.label_text}>종료시간</div>
										<FieldTime
											control={control}
											name="eventEndTime"
											validationOptions={{
												required: isEndDateOpen
													? '종료시간을 필수입니다!'
													: false,
											}}
										></FieldTime>
									</div>
								</div>

								<div
									className={styles.date_toggle_btn}
									onClick={setIsEndDateOpen}
								>
									- 종료 날짜 및 시간
								</div>
							</>
						)}

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
					{event ? '이벤트 수정' : '이벤트 만들기'}
				</CustomButton>
			</div>
		</form>
	);
};

export default withAuthClientSideProps<CreateEventProps>(CreateEvent);
