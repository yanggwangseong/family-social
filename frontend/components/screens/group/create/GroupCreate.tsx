import React, { FC } from 'react';
import styles from './GroupCreate.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Field from '@/components/ui/field/Field';
import Profile from '@/components/ui/profile/Profile';
import BackSpace from '@/components/ui/back-space/BackSpace';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { CreateGroupFields } from './group-create.interface';
import { GroupService } from '@/services/group/group.service';

const GroupCreate: FC = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<CreateGroupFields>({
		mode: 'onChange',
	});

	const { mutate: createGroupSync } = useMutation(
		['create-group'],
		(data: CreateGroupFields) =>
			GroupService.createGroup(data.groupName, data.groupDescription),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				console.log(data);
				Loading.remove();
				Report.success('성공', `그룹을 생성 하였습니다.`, '확인');
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

	const onSubmit: SubmitHandler<CreateGroupFields> = data => {
		createGroupSync(data);
	};

	return (
		<Format title={'group-create'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.contents_card}>
						<div className={styles.contents_wrap}>
							{/* 뒤로가기 */}
							<BackSpace title={'Back'} link={'/groups'} />

							<div className={styles.page_label_container}>
								<div className={styles.page_label}>그룹 {'>'} 그룹 만들기</div>
								<div className={styles.page_title}>그룹 만들기</div>
							</div>

							{/* 프로필 */}
							<div className={styles.form_container}>
								<Profile />
							</div>

							{/* 작성폼 */}
							<div className={styles.form_container}>
								<div className={styles.form_label}>그룹명</div>
								<Field
									{...register('groupName', {
										required: '그룹명 입력은 필수입니다!',
										maxLength: {
											value: 60,
											message: '최대 60자까지 가능합니다',
										},
									})}
									placeholder="그룹명을 입력해주세요"
									error={errors.groupName}
								></Field>
								<div className={styles.form_label}>그룹설명</div>
								<div>
									<textarea
										className={styles.field_area}
										{...register('groupDescription')}
										placeholder="그룹명을 입력해주세요"
									></textarea>
								</div>
							</div>
						</div>
						<div className={styles.footer_wrap}>
							<CustomButton
								type="submit"
								className="mt-8 bg-customOrange text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full py-4 px-4
								w-full hover:bg-orange-500
								"
								disabled={!isValid}
							>
								만들기
							</CustomButton>
						</div>
					</div>
				</form>
			</div>
		</Format>
	);
};

export default GroupCreate;
