import React, { FC } from 'react';
import styles from './GroupJoin.module.scss';
import Format from '@/components/ui/layout/Format';
import { BsDot } from 'react-icons/bs';
import Line from '@/components/ui/line/Line';
import GroupItemCard from '@/components/ui/group/item-card/GroupItemCard';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';
import { useMemberBelongToGroups } from '@/hooks/use-query/useMemberBelongToGroups';

const GroupJoin: FC = () => {
	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups();

	return (
		<Format title={'group-requests'}>
			<GroupFormat>
				{data && (
					<>
						<div className={styles.top_title_container}>
							<div className={styles.top_title}>가입한 모든 그룹</div>
							<div className={styles.top_title_icon_container}>
								<BsDot size={22} color="#707070"></BsDot>
							</div>
							<div className={styles.top_title_count}>{`${data.length}개`}</div>
						</div>
						{/* 가입한 모든 그룹 */}
						<div className={styles.group_item_card_container}>
							{data.map((item, index) => (
								<GroupItemCard group={item} key={index} />
							))}
						</div>
						<Line />
						<div className={styles.top_title_container}>
							<div className={styles.top_title}>관리 중인 그룹</div>
							<div className={styles.top_title_icon_container}>
								<BsDot size={22} color="#707070"></BsDot>
							</div>
							<div className={styles.top_title_count}>{`${
								data.filter(item => item.role === 'main').length
							}개`}</div>
						</div>
						{/* 관리중인 모든 그룹 */}
						<div className={styles.group_item_card_container}>
							{data
								.filter(item => item.role === 'main')
								.map((item, index) => (
									<GroupItemCard group={item} key={index} />
								))}
						</div>
					</>
				)}
			</GroupFormat>
		</Format>
	);
};

export default GroupJoin;
