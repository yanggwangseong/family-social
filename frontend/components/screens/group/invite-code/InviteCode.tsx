import React, { FC } from 'react';
import styles from './InviteCode.module.scss';
import { useRouter } from 'next/router';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import Format from '@/components/ui/layout/Format';

const InviteCode: FC = () => {
	const router = useRouter();

	const { groupId } = router.query as { groupId: string };

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<{ inviteCode: string; groupId: string }>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<{
		inviteCode: string;
		groupId: string;
	}> = data => {};

	return (
		<Format title={'invite-code'}>
			<div className={styles.container}>
				<div className={styles.contents_card}>
					<div className={styles.contents_wrap}>
						<div className={styles.signin__header_title}>이메일 인증 확인</div>
						<div className={styles.signin__header_subtitle}>
							이메일을 확인하려면 아래에 입력 하세요.
						</div>
						<div className={styles.signin__email_description}>
							코드가 포함된
						</div>
						<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.form_label}>확인 코드</div>

							<CustomButton
								type="submit"
								className="mt-8 bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full p-[10px] w-full"
								disabled={!isValid}
							>
								확인
							</CustomButton>
						</form>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default InviteCode;
