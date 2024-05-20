import React, { FC } from 'react';
import styles from './SidebarSharedMembers.module.scss';
import { ScheduleSidebarProps } from '../schedule-sidebar.interface';
import { useQuery } from 'react-query';
import { GroupService } from '@/services/group/group.service';
import { PiUsersThreeDuotone, PiCheckFatDuotone } from 'react-icons/pi';
import SelectProfile from '@/components/ui/profile/select-profile/SelectProfile';
import { motion } from 'framer-motion';
import { INLINEBUTTONGESTURE } from '@/utils/animation/gestures';

const SidebarSharedMembers: FC<ScheduleSidebarProps> = ({ isSelecteGroup }) => {
	const { data, isLoading } = useQuery(
		['get-members', isSelecteGroup],
		async () => await GroupService.getMembersBelongToGroup(isSelecteGroup),
	);

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<PiUsersThreeDuotone size={32} />
				<div className={styles.title}>공유 멤버 선택</div>
			</div>
			<motion.div
				className={styles.select_all_container}
				{...INLINEBUTTONGESTURE}
			>
				<PiCheckFatDuotone size={22} />
				<div className={styles.select_all_text}>전체 선택</div>
			</motion.div>
			<SelectProfile />
			<SelectProfile />
			<SelectProfile />
		</div>
	);
};

export default SidebarSharedMembers;
