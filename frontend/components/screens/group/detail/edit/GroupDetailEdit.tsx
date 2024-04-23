import React, { FC, useState } from 'react';
import styles from './GroupDetailEdit.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header/Header';
import GroupDetailSidebar from '@/components/ui/layout/sidebar/group/detail/GroupDetailSidebar';
import Line from '@/components/ui/line/Line';
import { PiNotePencilLight, PiNotePencilDuotone } from 'react-icons/pi';
import cn from 'classnames';
import Field from '@/components/ui/field/Field';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import FieldWithTextarea from '@/components/ui/field/field-area/FieldArea';
import { useMutation } from 'react-query';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { GroupService } from '@/services/group/group.service';
import axios from 'axios';
import {
	GroupDetailEditModeType,
	UpdateGroupFields,
} from './group-update.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEditMode } from '@/hooks/useEditMode';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';

const GroupDetailEdit: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	const { isMode, handleEdit } = useEditMode<GroupDetailEditModeType>('reset');

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<UpdateGroupFields>({
		mode: 'onChange',
	});

	const { mutate: updateGroupSync } = useMutation(
		['update-group'],
		(data: UpdateGroupFields) =>
			GroupService.updateGroup(groupId, data.groupName, data.groupDescription),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success(
					'성공',
					`${data.groupName} 그룹을 수정에 성공 하였습니다.`,
					'확인',
					() => {
						handleEdit('reset');
					},
				);
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

	const onSubmit: SubmitHandler<UpdateGroupFields> = data => {
		updateGroupSync(data);
	};

	return (
		<Format title={'group-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupDetailSidebar groupId={groupId} />
					<div className={styles.right_contents_container}>
						<div className={styles.main_contents_container}>
							<div className={styles.detail_container}>
								<div className={styles.detail_wrap}>
									<div
										className={cn(styles.group_setting_lst_menu_container, {
											[styles.disabled]:
												isMode !== 'reset' && isMode !== 'information',
										})}
									>
										<div className={styles.detail_container_title}>
											그룹 수정
										</div>
										<div className={styles.menu_container}>
											{isMode && isMode === 'information' ? (
												<div className={styles.form_container}>
													<form onSubmit={handleSubmit(onSubmit)}>
														<div className={styles.field_container}>
															{/* input 그룹이름 */}
															<Field
																fieldClass={'inline_input'}
																labelText={'그룹 이름'}
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

															{/* textarea 그룹설명 */}
															<FieldWithTextarea
																fieldClass={'inline_textarea'}
																labelText={'그룹 설명'}
																{...register('groupDescription', {
																	maxLength: {
																		value: 1000,
																		message: '최대 1000자까지 가능합니다',
																	},
																})}
																placeholder="그룹설명을 입력해주세요"
																error={errors.groupDescription}
															></FieldWithTextarea>
														</div>
														<div className={styles.btn_container}>
															<CustomButton
																className="mt-8 mb-4 bg-customDark text-customOrange 
															font-bold border border-solid border-customDark 
															rounded-full p-[10px] hover:opacity-80 w-full"
																type="submit"
															>
																저장
															</CustomButton>
															<CustomButton
																className="mt-8 mb-4 bg-white text-customDark 
															font-bold border border-solid border-customDark 
															rounded-full p-[10px] hover:opacity-80 w-full"
																type="button"
																onClick={() => handleEdit('reset')}
															>
																취소
															</CustomButton>
														</div>
													</form>
												</div>
											) : (
												<div className={styles.menu_description_container}>
													<div className={styles.menu_title}>
														그룹 이름 및 설명
													</div>
													<div
														className={styles.edit_btn_container}
														onClick={() =>
															isMode === 'reset' && handleEdit('information')
														}
													>
														<motion.div
															className={styles.btn_wrap}
															{...INLINEBUTTONGESTURE}
														>
															<div className={styles.icon_container}>
																<PiNotePencilDuotone size={22} />
															</div>
															<div className={styles.btn_text}>편집</div>
														</motion.div>
													</div>
												</div>
											)}
										</div>
									</div>

									<Line />

									<div
										className={cn(styles.group_setting_lst_menu_container, {
											[styles.disabled]:
												isMode !== 'reset' && isMode !== 'visitMessage',
										})}
									>
										<div className={styles.detail_container_title}>
											새 멤버 소개
										</div>
										<div className={styles.menu_container}>
											{isMode && isMode === 'visitMessage' ? (
												<div className={styles.form_container}>
													<form>
														<div>폼</div>
														<button
															type="button"
															onClick={() => handleEdit('reset')}
														>
															취소
														</button>
													</form>
												</div>
											) : (
												<div className={styles.menu_description_container}>
													<div className={styles.menu_title}>
														그룹을 처음 방문한 새로운 멤버에게 표시할 메시지를
														작성해보세요
													</div>
													<div
														className={styles.edit_btn_container}
														onClick={() =>
															isMode === 'reset' && handleEdit('visitMessage')
														}
													>
														<motion.div
															className={styles.btn_wrap}
															{...INLINEBUTTONGESTURE}
														>
															<div className={styles.icon_container}>
																<PiNotePencilDuotone size={22} />
															</div>
															<div className={styles.btn_text}>편집</div>
														</motion.div>
													</div>
												</div>
											)}
										</div>
									</div>

									<Line />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupDetailEdit;
