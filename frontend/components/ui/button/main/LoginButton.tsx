import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';
import { LoginButtonProps } from './login-button.interface';
import styles from './LoginButton.module.scss';

const LoginButton: FC<LoginButtonProps> = ({
	link,
	imgUrn,
	text,
	Icon,
	IconColor,
	IconSize,
}) => {
	return (
		<div className={styles.container}>
			<Link href={link} className={styles.link}>
				<div className={styles.btn_container}>
					<div className={styles.icon_container}>
						{Icon && <Icon size={IconSize} color={`#${IconColor}`} />}
						{imgUrn && (
							<Image src={imgUrn} alt={text} width={26} height={26}></Image>
						)}
					</div>
					<div className={styles.btn_text}>{text}</div>
				</div>
			</Link>
		</div>
	);
};

export default LoginButton;
