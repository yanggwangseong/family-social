import React, { FC } from 'react';
import styles from './Header.module.scss';
import Field from '../field/Field';
import Link from 'next/link';
import { FaRegBell } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';

const Header: FC = () => {
	return (
		<div className={styles.header_container}>
			<div className={styles.header_wrap}>
				<div className={styles.header_left_container}>
					<div className={styles.header_logo}>Fam</div>
					<Field style={{ marginLeft: '40px' }} fieldClass={'input'}></Field>
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
	);
};

export default Header;
