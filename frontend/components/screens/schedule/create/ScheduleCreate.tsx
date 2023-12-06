import Header from '@/components/ui/header/Header';
import Format from '@/components/ui/layout/Format';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import React, { FC, useState } from 'react';
import styles from './ScheduleCreate.module.scss';
import { useMemberBelongToGroups } from '@/hooks/useMemberBelongToGroups';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const ScheduleCreate: FC = () => {
	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups();

	return (
		<Format title={'schedule-create'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							<div className={styles.select_group_container}>
								<div className={styles.step_title}>STEP 1</div>
								<div className={styles.selectedGroup_title}>그룹선택</div>
								<div className={styles.selectedGroup_groups_container}>
									{isLoading || !data ? (
										<Skeleton />
									) : (
										data.map(group => (
											<div className={styles.group_card_wrap} key={group.id}>
												<GroupProfile
													group={{
														id: group.group.id,
														groupDescription: group.group.groupDescription,
														groupName: group.group.groupName,
													}}
													onSelectedGroup={handleSelectedGroup}
													isSelecteGroup={isSelecteGroup}
												/>
											</div>
										))
									)}
								</div>

								<div className={styles.button_container}>
									<CustomButton
										type="button"
										className="mt-8 mb-4 bg-white text-customDark 
										font-bold border border-solid border-customDark 
										rounded-full p-[10px] w-full hover:opacity-80"
									>
										이전
									</CustomButton>
									<CustomButton
										type="button"
										className="mt-8 mb-4 bg-customOrange text-customDark 
											font-bold border border-solid border-customDark 
											rounded-full p-[10px]
											w-full hover:bg-orange-500
											"
									>
										다음
									</CustomButton>
								</div>
							</div>
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default ScheduleCreate;
