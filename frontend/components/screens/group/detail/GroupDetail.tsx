import React, { FC } from 'react';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';

import { useLottieLike } from '@/hooks/useLottieLike';

import GroupDetailFormat from '@/components/ui/layout/group/GroupDetailFormat';
import FeedContainer from '../../feed/feed-container/FeedContainer';

const GroupDetail: FC = () => {
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

export default GroupDetail;
