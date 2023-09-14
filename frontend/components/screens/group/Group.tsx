import Format from '@/components/ui/layout/Format';
import React, { FC } from 'react';
import styles from './Group.module.scss';
import Field from '@/components/ui/field/Field';
import { FaRegBell } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import Link from 'next/link';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';

const Group: FC = () => {
	return (
		<Format title={'groups'}>
			<div className={styles.container}>
				<div className={styles.header_container}>
					<div className={styles.header_wrap}>
						<div className={styles.header_left_container}>
							<div className={styles.header_logo}>Fam</div>
							<Field style={{ marginLeft: '40px' }}></Field>
						</div>
						<div className={styles.right_icons_container}>
							<Link href={'/feeds'}>
								<div className={styles.icon_wrap}>
									<AiOutlineHome size={22}></AiOutlineHome>
								</div>
							</Link>
							<div className={styles.icon_wrap}>
								<FaRegBell size={22}></FaRegBell>
							</div>
							<div className={styles.icon_wrap}>
								<AiOutlineMessage size={22}></AiOutlineMessage>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.contents_container}>
					<GroupSidebar />
					<div>contensts</div>
					<div>rightside</div>
				</div>
			</div>
		</Format>
	);
};

export default Group;
