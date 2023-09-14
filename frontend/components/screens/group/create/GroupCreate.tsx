import React, { FC } from 'react';
import styles from './GroupCreate.module.scss';
import Format from '@/components/ui/layout/Format';

const GroupCreate: FC = () => {
	return (
		<Format title={'group-create'}>
			<div className={styles.container}>그룹생성</div>
		</Format>
	);
};

export default GroupCreate;
