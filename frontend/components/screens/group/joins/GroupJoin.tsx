import React, { FC } from 'react';
import styles from './GroupJoin.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';
import { BsDot } from 'react-icons/bs';
import Line from '@/components/ui/line/Line';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import GroupItemCard from '@/components/ui/group/item-card/GroupItemCard';

const GroupJoin: FC = () => {
	const fakeSigninGroup = [0, 1, 2, 3, 4, 5];
	const fakeManageGroup = [0, 1, 2, 3, 4, 5];
	return (
		<Format title={'group-requests'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupSidebar />
					<div className={styles.main_contents_container}>
						<div className={styles.top_title_container}>
							<div className={styles.top_title}>가입한 모든 그룹</div>
							<div className={styles.top_title_icon_container}>
								<BsDot size={22} color="#707070"></BsDot>
							</div>
							<div className={styles.top_title_count}>2개</div>
						</div>
						{/* 가입한 모든 그룹 */}
						<div className="flex flex-wrap">
							{fakeSigninGroup.map((item, index) => (
								<GroupItemCard key={index} />
							))}
						</div>
						<Line />
						<div className={styles.top_title_container}>
							<div className={styles.top_title}>관리 중인 그룹</div>
							<div className={styles.top_title_icon_container}>
								<BsDot size={22} color="#707070"></BsDot>
							</div>
							<div className={styles.top_title_count}>2개</div>
						</div>
						{/* 관리중인 모든 그룹 */}
						<div className="flex flex-wrap">
							{fakeManageGroup.map((item, index) => (
								<GroupItemCard key={index} />
							))}
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupJoin;
