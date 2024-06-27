import Format from '@/components/ui/layout/Format';
import GroupDetailFormat from '@/components/ui/layout/group/GroupDetailFormat';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styles from './GroupDetailEvent.module.scss';

const GroupDetailEvent: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	return (
		<Format title={'group-detail-event'}>
			<GroupDetailFormat groupId={groupId} page="GROUPEVENT">
				<div className={styles.group_event_container}>ff</div>
			</GroupDetailFormat>
		</Format>
	);
};

export default GroupDetailEvent;
