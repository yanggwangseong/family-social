import React, { FC } from 'react';
import styles from './GroupRequests.module.scss';
import Format from '@/components/ui/layout/Format';
import Invitations from './invitations/Invitations';
import { BsDot } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { FamService } from '@/services/fam/fam.service';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';
import NotFoundSearch from '@/components/ui/not-found/search/NotFoundSearch';
import { NOT_FOUND_GROUP_REQUEST } from '@/constants/index';

const GroupRequests: FC = () => {
	const { data, isLoading } = useQuery(
		['group-requests'],
		async () => await FamService.getInvitations(),
	);

	if (isLoading) return <div>Loading</div>;
	if (!data) return null;

	return (
		<Format title={'group-requests'}>
			<GroupFormat>
				<div className={styles.top_title_container}>
					<div className={styles.top_title}>그룹 멤버 초대 요청</div>
					<div className={styles.top_title_icon_container}>
						<BsDot size={22} color="#707070"></BsDot>
					</div>
					<div className={styles.top_title_count}>{data.count}개</div>
				</div>
				{data.list.length === 0 && (
					<NotFoundSearch message={NOT_FOUND_GROUP_REQUEST} />
				)}
				{/* 그룹 초대 요청리스트 */}
				<Invitations invitations={data.list} />
			</GroupFormat>
		</Format>
	);
};

export default GroupRequests;
