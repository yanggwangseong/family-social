import React, { FC } from 'react';
import styles from './InviteCode.module.scss';
import { useRouter } from 'next/router';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import Format from '@/components/ui/layout/Format';
import { useQuery } from 'react-query';
import { GroupService } from '@/services/group/group.service';
import Image from 'next/image';
import { PiUserDuotone } from 'react-icons/pi';
import { InviteCodeRequest } from './invite-code.interface';
import { FamService } from '@/services/fam/fam.service';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';
import { useCreateMutation } from '@/hooks/useCreateMutation';
import { Loading, Report } from 'notiflix';
import { useGroupDetailQuery } from '@/hooks/use-query/useGroupDetailQuery';

const InviteCode: FC = () => {
	const router = useRouter();

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { groupId, inviteCode } = router.query as {
		groupId: string;
		inviteCode: string;
	};

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<InviteCodeRequest>({
		mode: 'onChange',
	});

	const { groupDetail: groupData, groupDetailLoading: groupLoading } =
		useGroupDetailQuery(groupId);

	const { mutate: validateInviteCode } = useCreateMutation(
		async (data: InviteCodeRequest) =>
			await FamService.validateInvitationCode(data.inviteCode, data.groupId),
		{
			mutationKey: ['invite-code'],
			onSuccess: data => {
				Loading.remove();
				Report.success(
					'성공',
					`${groupData?.group.groupName} 그룹에 초대되었습니다.`,
					'확인',
					() => {
						handleSuccessLayerModal({
							modalTitle: '그룹 초대 생성 성공',
							layer: LayerMode.successLayerModal,
							lottieFile: 'inviteCodeAnimation',
							message: '그룹에 초대 되었습니다',
							onConfirm: () => {
								router.push(`/groups/${groupData?.group.id}`);
							},
						});
					},
				);
			},
		},
	);

	const onSubmit: SubmitHandler<InviteCodeRequest> = data => {
		validateInviteCode({
			inviteCode,
			groupId,
		});
	};

	return (
		groupData && (
			<Format title={'invite-code'}>
				<div className={styles.container}>
					<div className={styles.contents_card}>
						<div className={styles.contents_wrap}>
							<div className={styles.group_image}>
								<Image
									src={'/images/banner/group-base.png'}
									alt={groupData.group.groupName}
									fill
								/>
							</div>
							<div className={styles.header_title}>
								{groupData.group.groupName}
							</div>
							<div className={styles.header_subtitle}>
								{groupData.group.groupDescription}
							</div>
							<div className={styles.group_members}>
								<div className={styles.group_members_icon}>
									<PiUserDuotone size={24} color="#0a0a0a" />
								</div>
								<div className={styles.group_members_count}>
									{groupData.memberCount}명
								</div>
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
