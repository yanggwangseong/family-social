import React, { FC, useState } from 'react';
import styles from './GroupDetailEdit.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header/Header';
import GroupDetailSidebar from '@/components/ui/layout/sidebar/group/detail/GroupDetailSidebar';
import Line from '@/components/ui/line/Line';
import { PiNotePencilLight } from 'react-icons/pi';

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
								{isMode.mode && isMode.mode !== 'information' ? (
									<div>disabled상태</div>
								) : (
									<div>
										<div className={styles.detail_container_title}>
											그룹 수정
										</div>
										<div className="flex mt-10">
											{isMode.mode && isMode.mode === 'information' ? (
												<div>
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
												<div className="flex w-full">
													<div>그룹 이름 및 설명</div>
													<div
														className="ml-auto cursor-pointer hover:text-customOrange"
														onClick={() => handleEdit('information')}
													>
														<div className="flex">
															<div className="flex justify-center items-center">
																<PiNotePencilLight size={22} />
															</div>
															<div className="font-medium ml-2">편집</div>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								)}

								<Line />
								{isMode.mode && isMode.mode !== 'visitMessage' ? (
									<div>disabled상태</div>
								) : (
									<div>
										<div className={styles.detail_container_title}>
											새 멤버 소개
										</div>
										<div className="flex mt-10">
											{isMode.mode && isMode.mode === 'visitMessage' ? (
												<div>
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
												<div className="flex w-full">
													<div>
														그룹을 처음 방문한 새로운 멤버에게 표시할 메시지를
														작성해보세요
													</div>
													<div
														className="ml-auto cursor-pointer hover:text-customOrange"
														onClick={() => handleEdit('visitMessage')}
													>
														<div className="flex">
															<div className="flex justify-center items-center">
																<PiNotePencilLight size={22} />
															</div>
															<div className="font-medium ml-2">편집</div>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								)}
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
