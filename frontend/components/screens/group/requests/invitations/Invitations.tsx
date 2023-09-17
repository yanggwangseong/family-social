import React, { FC } from 'react';
import InvitationItem from '@/components/ui/group/invitation-item/InvitationItem';
import styles from './Invitations.module.scss';
import { FamInvitation } from '@/shared/interfaces/fam.interface';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useMutation } from 'react-query';
import axios from 'axios';
import { FamService } from '@/services/fam/fam.service';
import { AcceptInvitationFields } from './invitations.interface';

const Invitations: FC<{ invitations: FamInvitation[] }> = ({ invitations }) => {
	//초대 수락 usemutation [put] /groups/:groupId/members/:memberId/fams/:famId/accept-invitation
	//초대 거절 usemutation [delete] /groups/:groupId/members/:memberId/fams/:famId

	const { mutate: acceptInvitationSync } = useMutation(
		['login'],
		(data: AcceptInvitationFields) => FamService.AcceptInvitation(data),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `로그인 성공 하였습니다.`, '확인');
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

	const handleAcceptInvitation = () => {};
	return (
		<div className={styles.invitation_container}>
			{invitations.map((invitation, index) => (
				<InvitationItem key={index} invitation={invitation}></InvitationItem>
			))}
		</div>
	);
};

export default Invitations;
