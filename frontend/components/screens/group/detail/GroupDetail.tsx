import React, { FC, useState } from 'react';
import styles from './GroupDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header/Header';
import GroupDetailSidebar from '@/components/ui/layout/sidebar/group/detail/GroupDetailSidebar';
import Image from 'next/image';
import Profile from '@/components/ui/profile/Profile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import ToggleModal from '@/components/ui/modal/ToggleModal';
import { BsLink45Deg, BsTelephonePlus } from 'react-icons/bs';
import { ToggleMenu } from '@/components/ui/modal/toggle-modal.interface';
import { InviteMenu } from '@/components/ui/modal/toggle-menu.constants';

const GroupDetail: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	const [isOpenInvitation, setOpenInvitation] = useState<boolean>(false);

	return (
		<Format title={'group-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupDetailSidebar groupId={groupId} />
					<div className={styles.detail_container}>
						<div className={styles.main}>
							<div className={styles.banner_img_container}>
								<Image
									fill
									src={'/images/banner/group-base.png'}
									alt="banner"
								></Image>
							</div>
							<div className={styles.main_contents_container}>
								<div className={styles.banner_profile_contaienr}>
									{/* 프로필 */}
									<Profile />
									<div className={styles.banner_profile_right_contaienr}>
										<div className={styles.toggle_menu_container}>
											<CustomButton
												type="button"
												className="bg-customOrange text-customDark 
												font-bold border border-solid border-customDark 
												rounded-full w-full py-[10px] px-7
												hover:bg-orange-500
												"
												onClick={() => setOpenInvitation(!isOpenInvitation)}
											>
												+ 초대하기
											</CustomButton>
											{isOpenInvitation && (
												// toggle modal
												<ToggleModal list={InviteMenu} />
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupDetail;
