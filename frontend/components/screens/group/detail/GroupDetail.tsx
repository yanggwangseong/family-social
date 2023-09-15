import React, { FC } from 'react';
import styles from './GroupDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';

const GroupDetail: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	return (
		<Format title={'group-detail'}>
			<div>{groupId}</div>
		</Format>
	);
};

export default GroupDetail;
