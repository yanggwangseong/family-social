import React, { FC } from 'react';
import styles from './Social.module.scss';
import Image from 'next/image';
import Format from '@/components/ui/layout/Format';
import Field from '@/components/ui/field/Field';
import Line from '@/components/ui/line/Line';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { MemberService } from '@/services/member/member.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validPhoneNumber } from '../sign-up.constants';
import { SignUpSocialFields } from './social.interface';

const Social: FC = () => {
	const router = useRouter();
	const { id } = router.query as unknown as { id: string };

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<SignUpSocialFields>({
		mode: 'onChange',
	});

	const { data, isLoading } = useQuery(
		['get-member-by-memberId'],
		async () => await MemberService.getMemberByMemberId(id),
		{
			enabled: !!id,
		},
	);

	const onSubmit: SubmitHandler<
		Omit<SignUpSocialFields, 'profileImg'>
	> = data => {
		//registerSync(data);
		//reset();
	};

	return (
		<Format title="social-signup">
			<div className={styles.container}>
				{data && (
					<div className={styles.contents_card}>
						<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.contents_wrap}>
								<div className={styles.signin__header_title}>
									GOOGLE 계정을 이용한 회원가입
								</div>
								<div className={styles.signin__header_subtitle}>
									이메일과 비밀번호를 이용하여 로그인 할 수 있습니다.
								</div>

								<div className={styles.profile_img_selected_container}>
									<div className={styles.profile_img_title}>
										프로필 이미지 선택
									</div>
									<div className={styles.img_container}>
										<div className={styles.profile_img_container}>
											<Image
												className="rounded-full"
												width={60}
												height={60}
												src={data.profileImage}
												alt="img"
											></Image>
											<div>{data.username}</div>
										</div>
										<div className={styles.profile_img_container}>
											<Image
												className="rounded-full"
												width={60}
												height={60}
												src={'/images/profile/profile.png'}
												alt="img"
											></Image>
											<div>{data.username}</div>
										</div>
									</div>
								</div>

								{/* 라인 */}
								<Line />

								<div className={styles.section_subtitle}>추가 정보 입력</div>

								<div className={styles.form_label}>이름</div>
								<Field
									{...register('username', {
										required: '이름은 필수입니다!',
										minLength: {
											value: 2,
											message: '최소 이름은 2자 이상입니다.',
										},
									})}
									placeholder="이름을 입력 해주세요!"
									error={errors.username}
									defaultValue={data.username}
								/>
								<div className={styles.form_label}>전화번호</div>
								<Field
									{...register('phoneNumber', {
										required: '전화번호는 필수입니다',
										minLength: {
											value: 11,
											message: '전화번호는 11자리 입니다.',
										},
										pattern: {
											value: validPhoneNumber,
											message: '휴대폰번호 형식을 확인해주세요!',
										},
									})}
									maxLength={11}
									placeholder="휴대폰 번호를 '-'를 제외하고 입력 해주세요."
									error={errors.phoneNumber}
								/>
							</div>
							{/* 하단 버튼 컨테이너 */}
							<div className={styles.footer_wrap}>
								<CustomButton
									type="submit"
									className="bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full p-[10px] w-full"
									disabled={!isValid}
								>
									회원가입
								</CustomButton>
							</div>
						</form>
					</div>
				)}
			</div>
		</Format>
	);
};

export default Social;
