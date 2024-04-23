import React, { FC } from 'react';
import styles from './FeedDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';

const FeedDetail: FC = () => {
	return (
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}></div>
			</div>
		</Format>
	);
};

export default FeedDetail;
