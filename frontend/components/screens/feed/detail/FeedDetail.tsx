import React, { FC } from 'react';
import styles from './FeedDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import BackSpace from '@/components/ui/back-space/BackSpace';
import { useQuery } from 'react-query';
import { FeedService } from '@/services/feed/feed.service';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import FeedItem from '@/components/ui/feed/FeedItem';

const FeedDetail: FC = () => {
	const router = useRouter();
	const { feedId } = router.query as { feedId: string };

	const { data, isLoading } = useQuery(
		['get-feed-by-id'],
		async () => await FeedService.getFeedById(feedId),
		{
			enabled: !!feedId,
		},
	);
	console.log(data);
	return (
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							<div>
								<BackSpace title="Back" link="/notifications"></BackSpace>
							</div>
							{/* <AnimatePresence>
								{
									data && (
										<FeedItem
													
													feed={data}
													index={0}
													onLike={handleUpdateLike}
													page={page.page}
													onRefetch={handleRefetch}
													onLikeComment={handleLikeComment}
												/>
									)
								}
							
							</AnimatePresence> */}
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
