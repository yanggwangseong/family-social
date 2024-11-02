import Format from '@/components/ui/layout/Format';
import GroupDetailFormat from '@/components/ui/layout/group/group-detail/GroupDetailFormat';
import Line from '@/components/ui/line/Line';
import Profile from '@/components/ui/profile/Profile';
import { GroupService } from '@/services/group/group.service';
import { useRouter } from 'next/router';
import React, { FC, Fragment } from 'react';
import { useQuery } from 'react-query';
import styles from './GroupDetailMember.module.scss';
import { withGroupDetailProps } from 'hoc/with-group-detail-props';
import { GroupDetailProps } from '../group-detail.interface';

const GroupDetailMember: FC<GroupDetailProps> = ({ groupAccessLevel }) => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	const { data, isLoading } = useQuery(
		['get-members', groupId],
		async () => await GroupService.getMembersBelongToGroup(groupId),
	);

	return (
		<Format title={'group-detail-member'}>
			<GroupDetailFormat
				groupId={groupId}
				groupAccessLevel={groupAccessLevel}
				page="GROUPMEMBER"
			>
				<div className={styles.list_container}>
					{data && (
						<>
							{data
								.filter(item => item.role === 'main')
								.map((data, index) => (
									<Fragment key={index}>
										<div className={styles.section_title}>관리자</div>
										<Profile
											username={data.member.username}
											role={data.role}
											searchMember={data.member}
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
												searchMember={data.member}
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

export default withGroupDetailProps(GroupDetailMember);
