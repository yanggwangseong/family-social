import Header from '@/components/ui/header/Header';
import Format from '@/components/ui/layout/Format';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import React, { FC, useState } from 'react';
import styles from './ScheduleCreate.module.scss';
import SchedulePeriod from './schedule-period/SchedulePeriod';
import SelectGroup from './select-group/SelectGroup';
import { useMemberBelongToGroups } from '@/hooks/useMemberBelongToGroups';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { Union, schdulePages } from 'types';

const ScheduleCreate: FC = () => {
	const [isPage, setIsPage] =
		useState<Union<typeof schdulePages>>('selectGroupPage');

	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups();

	const handleChangePage = (page: Union<typeof schdulePages>) => {
		setIsPage(page);
	};

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
							{isPage === 'selectGroupPage' && (!data || isLoading) ? (
								<Skeleton />
							) : (
								isPage === 'selectGroupPage' &&
								data && (
									<SelectGroup
										onChangePage={handleChangePage}
										data={data}
										handleSelectedGroup={handleSelectedGroup}
										isSelecteGroup={isSelecteGroup}
									></SelectGroup>
								)
							)}
							{isPage === 'periodPage' && (
								<SchedulePeriod
									onChangePage={handleChangePage}
								></SchedulePeriod>
							)}
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
