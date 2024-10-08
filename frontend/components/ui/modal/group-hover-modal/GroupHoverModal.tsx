import React, { FC } from 'react';
import Image from 'next/image';
import styles from './GroupHover.module.scss';
import { GroupProfileResponse } from '@/shared/interfaces/group.interface';
import CustomButton from '../../button/custom-button/CustomButton';
import { useRouter } from 'next/router';

const GroupHoverModal: FC<{ sharedGroup: GroupProfileResponse }> = ({
	sharedGroup,
}) => {
	const router = useRouter();

	const handleGroupPage = () => {
		router.push(`/groups/${sharedGroup.id}`);
	};

	const { groupCoverImage, groupName, groupDescription } = sharedGroup;

	return (
		<div className={styles.container}>
			<div className={styles.profile_container}>
				<div className={styles.profile_img_container}>
					<Image
						className="rounded-full"
						fill
						src={
							groupCoverImage
								? groupCoverImage
								: '/images/banner/sm/group-base-sm.png'
						}
						alt="img"
					></Image>
				</div>
				<div className={styles.right_container}>
					<div className={styles.profile_username}>{groupName}</div>
					<div className={styles.mention}>{groupDescription}</div>
				</div>
			</div>

			<CustomButton
				className="bg-customOrange text-customDark 
                font-bold border border-solid border-customDark 
                rounded-full p-[10px]
                w-full"
				type="button"
				onClick={e => {
					e.stopPropagation(); // 이벤트 버블링 중지
					handleGroupPage();
				}}
			>
				그룹 바로가기
			</CustomButton>
		</div>
	);
};

export default GroupHoverModal;
