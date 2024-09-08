import React, { FC } from 'react';
import styles from './InviteCode.module.scss';
import { useRouter } from 'next/router';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import Format from '@/components/ui/layout/Format';
import { useQuery } from 'react-query';
import { GroupService } from '@/services/group/group.service';

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

	const { data, isLoading } = useQuery(
		['get-group-detail', groupId],
		async () => await GroupService.getGroupDetail(groupId),
	);

	const onSubmit: SubmitHandler<{
		inviteCode: string;
		groupId: string;
	}> = data => {};

	return (
		data && (
			<Format title={'invite-code'}>
				<div className={styles.container}>
					<div className={styles.contents_card}>
						<div className={styles.contents_wrap}>
							<div className={styles.signin__header_title}>
								{data.group.groupName} 그룹에 초대
							</div>
							<div className={styles.signin__header_subtitle}>
								{data.group.groupDescription}
							</div>

							<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
								<CustomButton
									type="submit"
									className="mt-8 bg-customOrange text-customDark font-bold border border-solid border-customDark rounded-full p-[10px] w-full"
								>
									수락하기
								</CustomButton>
							</form>
						</div>
					</div>
				</div>
			</Format>
		)
	);
};

export default InviteCode;
