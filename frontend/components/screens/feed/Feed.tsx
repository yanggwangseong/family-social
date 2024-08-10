import React, { FC } from 'react';
import styles from './Feed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';

import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';

import { useLottieLike } from '@/hooks/useLottieLike';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { useRouter } from 'next/router';
import { feedTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import { PiPencilDuotone } from 'react-icons/pi';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import { motion } from 'framer-motion';
import { BUTTONGESTURE } from '@/utils/animation/gestures';

import FeedContainer from './feed-container/FeedContainer';

const Feed: FC = () => {
	const router = useRouter();
	const query = router.query as { options: 'TOP' | 'MYFEED' | 'ALL' };

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	const { handleCreateFeed } = useCreateFeed();

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
							{/* 탭메뉴 */}

							<div className={styles.tap_menu_container}>
								<TabMenu list={feedTabMenus} options={query.options} />
							</div>

							<FeedContainer handleIsLottie={handleIsLottie} />
						</div>
						<div
							className={styles.mobile_create_feed_btn_container}
							onClick={handleCreateFeed}
						>
							<motion.div {...BUTTONGESTURE}>
								<PiPencilDuotone size={28} color="#0a0a0a" />
							</motion.div>
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default Feed;
