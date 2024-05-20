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

const SidebarSharedMembers: FC<ScheduleSidebarProps> = ({ isSelecteGroup }) => {
	const [isAllSelected, setIsAllSelected] = useState(false);
	const { data, isLoading } = useQuery(
		['get-members', isSelecteGroup],
		async () => await GroupService.getMembersBelongToGroup(isSelecteGroup),
	);

	const { isSharedFamIds, handleSharedFamIds } = useSharedFamIds();

	const handleAllSelectedMember = (members: MembersBelongToGroupResponse[]) => {
		isAllSelected === false
			? handleSharedFamIds(members.map(item => item.id))
			: handleSharedFamIds([]);

		// 상태값은 handle 함수 실행 시킨 후에 selected 변경
		setIsAllSelected(!isAllSelected);
	};

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
					{data.map((item, index) => (
						<SelectProfile
							key={index}
							belongToMember={item}
							selected={isSharedFamIds.includes(item.id)}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default SidebarSharedMembers;
