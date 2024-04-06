import React, { FC } from 'react';
import styles from './Social.module.scss';
import Image from 'next/image';
import Format from '@/components/ui/layout/Format';
import Field from '@/components/ui/field/Field';
import Line from '@/components/ui/line/Line';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const Social: FC = () => {
	return (
		<Format title="social-signup">
			<div className={styles.container}>
				<div className={styles.contents_card}>
					<div className={styles.contents_wrap}>
						<div className={styles.signin__header_title}>
							GOOGLE 계정을 이용한 회원가입
						</div>
						<div className={styles.signin__header_subtitle}>
							이메일과 비밀번호를 이용하여 로그인 할 수 있습니다.
						</div>

						<div className={styles.profile_img_selected_container}>
							<div className={styles.profile_img_title}>프로필 이미지 선택</div>
							<div className={styles.img_container}>
								<div className={styles.profile_img_container}>
									<Image
										className="rounded-full"
										width={60}
										height={60}
										src={'/images/profile/profile.png'}
										alt="img"
									></Image>
									<div>gaengdev</div>
								</div>
								<div className={styles.profile_img_container}>
									<Image
										className="rounded-full"
										width={60}
										height={60}
										src={'/images/profile/profile.png'}
										alt="img"
									></Image>
									<div>gaengdev</div>
								</div>
							</div>
						</div>
						{/* 라인 */}
						<Line />

						<div className={styles.section_subtitle}>추가 정보 입력</div>

						<form className={styles.form}>
							<div className={styles.form_label}>이름</div>
							<Field placeholder="이름을 입력 해주세요!" />
							<div className={styles.form_label}>전화번호</div>
							<Field
								maxLength={11}
								placeholder="휴대폰 번호를 '-'를 제외하고 입력 해주세요."
							/>
						</form>
					</div>
					{/* 하단 버튼 컨테이너 */}
					<div className={styles.footer_wrap}>
						<CustomButton
							type="submit"
							className="bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full p-[10px] w-full"
						>
							회원가입
						</CustomButton>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Social;
