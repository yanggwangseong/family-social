import React, { FC } from 'react';
import Field from '@/ui/field/Field';
import CustomButton from '@/ui/button/custom-button/CustomButton';
import styles from './UpdateTitle.module.scss';
import { ScheduleUpdateTitleProps } from './update-title.interface';
import { useForm } from 'react-hook-form';

const ScheduleUpdateTitle: FC<ScheduleUpdateTitleProps> = ({
	handleUpdateTitle,
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

	return (
		<form className="flex-1">
			<div className="flex gap-2">
				<div className="flex-1">
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
				<div className="flex h-8 gap-2">
					<CustomButton
						type="button"
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
