import React, { FC } from 'react';
import styles from './GroupDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header/Header';
import GroupDetailSidebar from '@/components/ui/layout/sidebar/group/detail/GroupDetailSidebar';

const GroupDetail: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	return (
		<Format title={'group-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupDetailSidebar />
					<div className={styles.main_contents_container}>
						<div className={styles.top_title_contianer}>
							<div className={styles.top_title}>찾아보기</div>
						</div>
						{/* 그룹별 내가 올린 피드가 만약 없을경우 */}
						<div>찾아보기 작업중</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupDetail;
