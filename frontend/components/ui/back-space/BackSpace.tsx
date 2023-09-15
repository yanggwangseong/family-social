import React, { FC } from 'react';
import styles from './BackSpace.module.scss';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BackSpaceProps } from './back-space.interface';

const BackSpace: FC<BackSpaceProps> = ({ title }) => {
	return (
		<div className={styles.backspace_container}>
			<Link className={styles.icon_container} href={'/groups'}>
				<AiOutlineArrowLeft size={20}></AiOutlineArrowLeft>
			</Link>

			<div className={styles.backspace_title}>{title}</div>
		</div>
	);
};

export default BackSpace;
