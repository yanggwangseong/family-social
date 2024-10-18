import React, { FC } from 'react';
import styles from './Discover.module.scss';
import Format from '@/components/ui/layout/Format';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';

const Discover: FC = () => {
	return (
		<Format title={'group-discover'}>
			<GroupFormat>
				<div className={styles.top_title_container}>
					<div className={styles.top_title}>찾아보기</div>
				</div>
				{/* 그룹별 내가 올린 피드가 만약 없을경우 */}
				<div>찾아보기 작업중</div>
			</GroupFormat>
		</Format>
	);
};

export default Discover;
