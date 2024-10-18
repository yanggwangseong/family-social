import React, { FC } from 'react';
import styles from './GroupJoin.module.scss';
import Format from '@/components/ui/layout/Format';
import { BsDot } from 'react-icons/bs';
import Line from '@/components/ui/line/Line';
import GroupItemCard from '@/components/ui/group/item-card/GroupItemCard';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';

const GroupJoin: FC = () => {
	const fakeSigninGroup = [0, 1, 2, 3, 4, 5];
	const fakeManageGroup = [0, 1, 2, 3, 4, 5];
	return (
		<Format title={'group-requests'}>
			<GroupFormat>
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
			</GroupFormat>
		</Format>
	);
};

export default GroupJoin;
