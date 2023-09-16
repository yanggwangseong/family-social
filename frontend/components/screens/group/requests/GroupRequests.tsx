import React, { FC } from 'react';
import styles from './GroupRequests.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';
import Invitations from './invitations/Invitations';
import { BsDot } from 'react-icons/bs';

const GroupRequests: FC = () => {
	return (
		<Format title={'group-requests'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupSidebar />
					<div className={styles.main_contents_container}>
						<div className={styles.top_title_contianer}>
							<div className={styles.top_title}>그룹 멤버 초대 요청</div>
							<div className={styles.top_title_icon_container}>
								<BsDot size={22} color="#707070"></BsDot>
							</div>
							<div className={styles.top_title_count}>1개</div>
						</div>
						{/* 그룹 초대 요청리스트 */}
						<Invitations />
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupRequests;
