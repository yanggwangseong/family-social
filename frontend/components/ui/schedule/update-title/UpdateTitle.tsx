import React, { FC } from 'react';
import Field from '@/ui/field/Field';
import CustomButton from '@/ui/button/custom-button/CustomButton';
import styles from './UpdateTitle.module.scss';
import { ScheduleUpdateTitleProps } from './update-title.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const ScheduleUpdateTitle: FC<ScheduleUpdateTitleProps> = ({
	handleUpdateTitle,
	scheduleId,
}) => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<{ scheduleName: string }>({
		mode: 'onChange',
	});

	const { mutate: updateScheduleNameSync } = useCreateMutation(
		async (data: { scheduleName: string }) =>
			await ScheduleService.updateScheduleName(scheduleId, data.scheduleName),
		{
			mutationKey: ['update-schedule-name'],
			onSuccess: data => {
				Loading.remove();
				Report.success(
					'성공',
					`여행일정 제목 수정이 성공 하였습니다`,
					'확인',
					() => {
						handleUpdateTitle();
					},
				);
			},
		},
	);

	const onSubmit: SubmitHandler<{ scheduleName: string }> = data => {
		updateScheduleNameSync(data);
	};

	return (
		<form
			className={styles.update_title_form}
			onSubmit={handleSubmit(onSubmit)}
			onClick={e => {
				e.stopPropagation();
			}}
		>
			<div className={styles.container}>
				<div className={styles.field_container}>
					<Field
						{...register('scheduleName', {
							required: '여행이름은 필수입니다',
							minLength: {
								value: 2,
								message: '최소 글자수는 2글자입니다.',
							},
							maxLength: {
								value: 30,
								message: '최대 글자수는 30글자입니다.',
							},
						})}
						className="text-xs"
						placeholder="여행 이름을 입력 해주세요."
						error={errors.scheduleName}
					></Field>
				</div>
				<div className={styles.btn_container}>
					<CustomButton
						type="submit"
						className="bg-customOrange text-customDark 
                        font-bold border border-solid border-customDark 
                        rounded-full text-xs px-4
                        w-full hover:bg-orange-500
                        "
						disabled={!isValid}
					>
						수정
					</CustomButton>
					<CustomButton
						type="button"
						className="bg-white text-customDark 
                        font-bold border border-solid border-customDark 
                        rounded-full text-xs px-4
                        w-full hover:opacity-80"
						onClick={handleUpdateTitle}
					>
						취소
					</CustomButton>
				</div>
			</div>
		</form>
	);
};

export default ScheduleUpdateTitle;
