import React, { FC, useState } from 'react';
import styles from './GroupDetailEdit.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header/Header';
import GroupDetailSidebar from '@/components/ui/layout/sidebar/group/detail/GroupDetailSidebar';
import Line from '@/components/ui/line/Line';
import { PiNotePencilLight } from 'react-icons/pi';
import cn from 'classnames';
import Field from '@/components/ui/field/Field';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import FieldWithTextarea from '@/components/ui/field/field-area/FieldArea';

const GroupDetailEdit: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	const [isMode, setMode] = useState<{ mode: string }>({
		mode: '',
	});

	const handleEdit = (mode: 'information' | 'visitMessage' | 'reset') => {
		if (mode === 'reset') return setMode({ mode: '' });
		setMode({ mode: mode });
	};
	return (
		<Format title={'group-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupDetailSidebar groupId={groupId} />
					<div className={styles.main_contents_container}>
						<div className={styles.detail_container}>
							<div className={styles.detail_wrap}>
								<div
									className={cn(styles.group_setting_lst_menu_container, {
										[styles.disabled]:
											isMode.mode && isMode.mode !== 'information',
									})}
								>
									<div className={styles.detail_container_title}>그룹 수정</div>
									<div className={styles.menu_container}>
										{isMode.mode && isMode.mode === 'information' ? (
											<div className={styles.form_container}>
												<form>
													<div className={styles.field_container}>
														{/* input 그룹이름 */}
														<Field
															fieldClass={'inline_input'}
															labelText={'그룹 이름'}
														></Field>

														{/* textarea 그룹설명 */}
														<FieldWithTextarea
															fieldClass={'inline_textarea'}
															labelText={'그룹 설명'}
														></FieldWithTextarea>
													</div>
													<div className={styles.btn_container}>
														<CustomButton
															className="mt-8 mb-4 bg-white text-customDark 
															font-bold border border-solid border-customDark 
															rounded-full p-[10px] w-1/2 hover:opacity-80"
															type="button"
															onClick={() => handleEdit('reset')}
														>
															취소
														</CustomButton>
														<CustomButton
															className="mt-8 mb-4 bg-customDark text-customOrange 
															font-bold border border-solid border-customDark 
															rounded-full p-[10px] w-1/2 hover:opacity-80"
															type="button"
															onClick={() => handleEdit('reset')}
														>
															저장
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
													onClick={
														!isMode.mode
															? () => handleEdit('information')
															: undefined
													}
												>
													<div className={styles.btn_wrap}>
														<div className={styles.icon_container}>
															<PiNotePencilLight size={22} />
														</div>
														<div className={styles.btn_text}>편집</div>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>

								<Line />

								<div
									className={cn(styles.group_setting_lst_menu_container, {
										[styles.disabled]:
											isMode.mode && isMode.mode !== 'visitMessage',
									})}
								>
									<div className={styles.detail_container_title}>
										새 멤버 소개
									</div>
									<div className={styles.menu_container}>
										{isMode.mode && isMode.mode === 'visitMessage' ? (
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
													onClick={
														!isMode.mode
															? () => handleEdit('visitMessage')
															: undefined
													}
												>
													<div className={styles.btn_wrap}>
														<div className={styles.icon_container}>
															<PiNotePencilLight size={22} />
														</div>
														<div className={styles.btn_text}>편집</div>
													</div>
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
		</Format>
	);
};

export default GroupDetailEdit;
