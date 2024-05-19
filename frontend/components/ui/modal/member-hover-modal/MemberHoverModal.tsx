import { SearchMemberResponse } from '@/shared/interfaces/member.interface';
import React, { FC } from 'react';
import styles from './MemberHoverModal.module.scss';
import Profile from '../../profile/Profile';
import { PiAtDuotone } from 'react-icons/pi';
import Image from 'next/image';
import Link from 'next/link';
import CustomButton from '../../button/custom-button/CustomButton';
import { useRouter } from 'next/router';

const MemberHoverModal: FC<{ mentionRecipient: SearchMemberResponse }> = ({
	mentionRecipient,
}) => {
	const router = useRouter();

	const handleProfilePage = () => {
		router.push(`/accounts/${mentionRecipient.email}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.profile_container}>
				<div className={styles.profile_img_container}>
					<Image
						className="rounded-full"
						fill
						src={mentionRecipient.profileImage ?? '/images/profile/profile.png'}
						alt="img"
					></Image>
				</div>
				<div className={styles.right_container}>
					<div className={styles.profile_username}>
						{mentionRecipient.username}
					</div>
					<div className={styles.mention}>
						{`@${mentionRecipient.username}`}
					</div>
					<div className={styles.profile_email}>
						<PiAtDuotone size={24} />
						{mentionRecipient.email}
					</div>
				</div>
			</div>

			<CustomButton
				className="bg-customOrange text-customDark 
                font-bold border border-solid border-customDark 
                rounded-full p-[10px]
                w-full"
				type="button"
				onClick={handleProfilePage}
			>
				프로필 바로가기
			</CustomButton>
		</div>
	);
};

export default MemberHoverModal;
