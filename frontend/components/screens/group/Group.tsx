import Format from '@/components/ui/layout/Format';
import React, { FC } from 'react';
import styles from './Group.module.scss';

const Group: FC = () => {
	return (
		<Format title={'groups'}>
			<div className={styles.container}>
				<div className={styles.header_container}>
					<div>logo</div>
					<div className={styles.right_icons_container}>아이콘</div>
				</div>
				<div>
					<div>sidebar</div>
					<div>contensts</div>
					<div>rightside</div>
				</div>
			</div>
		</Format>
	);
};

export default Group;
