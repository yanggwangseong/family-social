import React, { FC } from 'react';
import styles from './GroupDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header/Header';
import GroupDetailSidebar from '@/components/ui/layout/sidebar/group/detail/GroupDetailSidebar';
import Image from 'next/image';

const GroupDetail: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	return (
		<Format title={'group-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupDetailSidebar groupId={groupId} />
					<div className={styles.detail_container}>
						<div className="relative h-96">
							<Image
								fill
								src={'/images/banner/group-base.png'}
								alt="banner"
							></Image>
						</div>
						<div className={styles.main_contents_container}>
							<div>ssss</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupDetail;
