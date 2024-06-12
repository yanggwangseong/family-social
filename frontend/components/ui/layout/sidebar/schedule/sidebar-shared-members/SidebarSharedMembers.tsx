import React, { FC, useEffect, useState } from 'react';
import styles from './SidebarSharedMembers.module.scss';
import { ScheduleSidebarProps } from '../schedule-sidebar.interface';
import { useQuery } from 'react-query';
import { GroupService } from '@/services/group/group.service';
import { PiUsersThreeDuotone, PiCheckFatDuotone } from 'react-icons/pi';
import SelectProfile from '@/components/ui/profile/select-profile/SelectProfile';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { useSharedFamIds } from '@/hooks/useSharedFamIds';
import { MembersBelongToGroupResponse } from '@/shared/interfaces/member.interface';
import cn from 'classnames';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { Union, schdulePages } from 'types';

const SidebarSharedMembers: FC<ScheduleSidebarProps> = ({
	isSelecteGroup,
	onChangePage,
	isPage,
}) => {
	const [isAllSelected, setIsAllSelected] = useState(false);
	const { data, isLoading } = useQuery(
		['get-members', isSelecteGroup],
		async () => await GroupService.getMembersBelongToGroup(isSelecteGroup),
	);

	const { isSharedFamIds, handleSharedFamIds } = useSharedFamIds(data);

	const handleAllSelectedMember = (members: MembersBelongToGroupResponse[]) => {
		isAllSelected === false
			? handleSharedFamIds(members.map(item => item.id))
			: handleSharedFamIds([]);
	};

	const handleSelectedMember = (famId: string, isSelected: boolean) => {
		isSelected
			? handleSharedFamIds(isSharedFamIds.filter(item => item !== famId))
			: handleSharedFamIds([...isSharedFamIds, famId]);
	};

	const handleChangePage = (page: Union<typeof schdulePages>) => {
		onChangePage(page);
	};

	useEffect(() => {
		data && data.length === isSharedFamIds.length
			? setIsAllSelected(true)
			: setIsAllSelected(false);
	}, [data, isSharedFamIds.length]);

	return (
		<>
			{data && (
				<div className={styles.container}>
					<div className={styles.title_container}>
						<PiUsersThreeDuotone size={32} />
						<div className={styles.title}>공유 멤버 선택</div>
					</div>
					<motion.div
						className={styles.select_all_container}
						{...INLINEBUTTONGESTURE}
						onClick={() => handleAllSelectedMember(data)}
					>
						<PiCheckFatDuotone
							size={22}
							color={isAllSelected ? '#e5855d' : undefined}
						/>
						<div
							className={cn(styles.select_all_text, {
								[styles.active]: !!isAllSelected,
							})}
						>
							전체 선택
						</div>
					</motion.div>
					<div className={styles.select_profile_container}>
						{data.map((item, index) => (
							<SelectProfile
								key={index}
								belongToMember={item}
								selected={isSharedFamIds.includes(item.id)}
								handleSelectedMember={handleSelectedMember}
							/>
						))}
					</div>

					<div className={styles.right_sidebar_footer_container}>
						{isPage === 'scheduleDatePage' && (
							<>
								<CustomButton
									type="button"
									className="mt-8 mb-4 bg-white text-customDark 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:opacity-80"
									onClick={() => handleChangePage('selectGroupPage')}
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
									onClick={() => handleChangePage('periodPage')}
								>
									다음
								</CustomButton>
							</>
						)}

						{isPage === 'periodPage' && (
							<>
								<CustomButton
									type="button"
									className="mt-8 mb-4 bg-white text-customDark 
							font-bold border border-solid border-customDark 
							rounded-full p-[10px] w-full hover:opacity-80"
									onClick={() => handleChangePage('scheduleDatePage')}
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
									onClick={() => handleChangePage('tourismPage')}
								>
									다음
								</CustomButton>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default SidebarSharedMembers;
