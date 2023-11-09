import React, { FC } from 'react';
import styles from './EditProfile.module.scss';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';

const EditProfile: FC = () => {
	return (
		<div className="mt-12">
			<div className="relative z-10 border border-solid border-customDark w-[120px] h-[120px] rounded-full">
				<Image
					className="rounded-full brightness-50"
					width={120}
					height={120}
					src={'/images/profile/profile.png'}
					alt="img"
				></Image>
				<div className={styles.profile_img_icon_container}>
					<GoPencil size={18} color="#0a0a0a" />
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
