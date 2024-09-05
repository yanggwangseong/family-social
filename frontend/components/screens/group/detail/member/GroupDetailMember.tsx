import Format from '@/components/ui/layout/Format';
import GroupDetailFormat from '@/components/ui/layout/group/GroupDetailFormat';
import Line from '@/components/ui/line/Line';
import Profile from '@/components/ui/profile/Profile';
import { GroupService } from '@/services/group/group.service';
import { useRouter } from 'next/router';
import React, { FC, Fragment } from 'react';
import { useQuery } from 'react-query';
import styles from './GroupDetailMember.module.scss';

const GroupDetailMember: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	const { data, isLoading } = useQuery(
		['get-members', groupId],
		async () => await GroupService.getMembersBelongToGroup(groupId),
	);

	return (
		<Format title={'group-detail-member'}>
			<GroupDetailFormat groupId={groupId} page="GROUPMEMBER">
				<div className={styles.list_container}>
					{data && (
						<>
							{data
								.filter(item => item.role === 'main')
								.map((data, index) => (
									<Fragment key={index}>
										<div className={styles.section_title}>관리자</div>
										<Profile
											key={index}
											username={data.member.username}
											role={data.role}
										/>
										<Line />
									</Fragment>
								))}
							{
								<>
									<div className={styles.section_title}>그룹 참여자</div>
									{data
										.filter(item => item.role !== 'main')
										.map((data, index) => (
											<Profile
												key={index}
												username={data.member.username}
												role={data.role}
											/>
										))}
								</>
							}
						</>
					)}
				</div>
			</GroupDetailFormat>
		</Format>
	);
};

export default GroupDetailMember;