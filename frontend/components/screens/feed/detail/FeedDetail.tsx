import React, { FC } from 'react';
import styles from './FeedDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import BackSpace from '@/components/ui/back-space/BackSpace';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import FeedItem from '@/components/ui/feed/FeedItem';
import { useFeedLike } from '@/hooks/useFeedLike';
import { useLottieLike } from '@/hooks/useLottieLike';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { useCommentLike } from '@/hooks/useCommentLike';
import { useFeedByIdQuery } from '@/hooks/use-query/useFeedByIdQuery';

const FeedDetail: FC = () => {
	const router = useRouter();
	const { feedId } = router.query as { feedId: string };

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	const { feed, refetch } = useFeedByIdQuery(feedId, {
		enabled: !!feedId,
	});

	const handleRefetch = (pageValue: number) => {
		refetch();
	};

	const { handleUpdateLike } = useFeedLike({ handleRefetch, handleIsLottie });

	const { handleLikeComment } = useCommentLike({
		handleRefetch,
		handleIsLottie,
	});

	return (
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<LottieLike
						lottieRef={lottieRef}
						onLottieComplete={handleLottieComplete}
					/>

					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							<div className={styles.back_space_container}>
								<BackSpace title="Back" link="/notifications"></BackSpace>
							</div>
							<div className={styles.feed_container}>
								<AnimatePresence>
									{feed && (
										<FeedItem
											feed={feed}
											index={0}
											onLike={handleUpdateLike}
											page={1}
											onRefetch={handleRefetch}
											onLikeComment={handleLikeComment}
										/>
									)}
								</AnimatePresence>
							</div>
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default FeedDetail;
