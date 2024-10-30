import React, { FC, PropsWithChildren } from 'react';
import styles from './GroupFormat.module.scss';
import Header from '../../header/Header';
import GroupSidebar from '../sidebar/group/GroupSidebar';

const GroupFormat: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.contents_container}>
				<GroupSidebar />
				<div className={styles.main_contents_container}>{children}</div>
			</div>
		</div>
	);
};

export default GroupFormat;
