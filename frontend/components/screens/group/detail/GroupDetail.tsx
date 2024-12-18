import React, { FC } from 'react';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';

import { useLottieLike } from '@/hooks/useLottieLike';

import GroupDetailFormat from '@/components/ui/layout/group/group-detail/GroupDetailFormat';
import FeedContainer from '../../feed/feed-container/FeedContainer';
import { GroupDetailProps } from './group-detail.interface';
import { withGroupDetailProps } from 'hoc/with-group-detail-props';

const GroupDetail: FC<GroupDetailProps> = ({ groupAccessLevel }) => {
	const router = useRouter();

	const { groupId } = router.query as { groupId: string };

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	return (
		<Format title={'group-detail'}>
			<GroupDetailFormat
				groupId={groupId}
				lottieRef={lottieRef}
				handleLottieComplete={handleLottieComplete}
				page="GROUPFEED"
				groupAccessLevel={groupAccessLevel}
			>
				<FeedContainer
					options="GROUPFEED"
					handleIsLottie={handleIsLottie}
					groupId={groupId}
				/>
			</GroupDetailFormat>
		</Format>
	);
};

export default withGroupDetailProps(GroupDetail);
