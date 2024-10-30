import React, { FC } from 'react';
import styles from './GroupFollowModal.module.scss';
import { useRecoilState } from 'recoil';
import { groupFollowAtom } from '@/atoms/groupFollowAtom';
import { useMemberBelongToGroups } from '@/hooks/use-query/useMemberBelongToGroups';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import { useGroupDetailQuery } from '@/hooks/use-query/useGroupDetailQuery';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { PiHandshakeDuotone, PiUsersDuotone } from 'react-icons/pi';
import { useCreateMutation } from '@/hooks/useCreateMutation';
import { GroupService } from '@/services/group/group.service';
import { Loading, Notify } from 'notiflix';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';
import { modalAtom } from '@/atoms/modalAtom';
import { MemberBelongToGroupsResponse } from '@/shared/interfaces/group.interface';

const GroupFollowModal: FC = () => {
	const [groupFollowId, setGroupFollow] = useRecoilState(groupFollowAtom);
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const { data: groups } = useMemberBelongToGroups({ isMainRole: true });

	const { handleSelectedGroup, isSelecteGroup } = useMemberBelongToGroups({
		isMainRole: true,
	});

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { groupDetail: groupData, groupDetailLoading: groupLoading } =
		useGroupDetailQuery(groupFollowId.groupId);

	const { mutate: followGroup } = useCreateMutation(
		async () =>
			await GroupService.followGroup(isSelecteGroup, groupFollowId.groupId),
		{
			mutationKey: ['followGroup'],
			onSuccess(data) {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '팔로우 요청 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'groupFollowAnimation',
					message: '팔로우 요청이 완료되었습니다',
					onConfirm: () => {
						setIsShowing(false);
						setGroupFollow({ groupId: '' });
					},
				});
			},
		},
	);

	const handleFollowGroup = () => {
		if (!isSelecteGroup) {
			Notify.warning('그룹을 선택해주세요!');
			return false;
		}

		followGroup();
	};

	const filterUnfollowedGroups = (
		groups: MemberBelongToGroupsResponse[],
		followings: string[],
	) => {
		return groups.filter(data => !followings.includes(data.group.id));
	};

	return (
		<div className={styles.container}>
			{groupData && (
				<div className={styles.groupDetail}>
					<div className={styles.groupDetail_header}>
						<PiUsersDuotone size={24} />
						<span>팔로우 대상 그룹</span>
					</div>

					<GroupProfile group={groupData.group} />
				</div>
			)}
			<div className={styles.groupList}>
				<div className={styles.groupList_header}>
					<PiHandshakeDuotone size={24} />
					<span>어떤 그룹과 팔로우 할까요?</span>
				</div>
				<div className={styles.groupList_body}>
					{groups &&
						groups.length > 0 &&
						groupData &&
						filterUnfollowedGroups(groups, groupData.followings).map(group => (
							<GroupProfile
								key={group.group.id}
								group={group.group}
								onSelectedGroup={handleSelectedGroup}
								isSelecteGroup={isSelecteGroup}
							/>
						))}
				</div>
			</div>
			<div className={styles.bottom_btn_container}>
				<CustomButton
					type="button"
					className="ml-auto bg-customOrange text-customDark 
					  font-bold border border-solid border-customDark 
					  rounded-full p-[10px]
					  w-full hover:bg-orange-500
					  "
					disabled={!isSelecteGroup}
					onClick={handleFollowGroup}
				>
					팔로우 요청
				</CustomButton>
			</div>
		</div>
	);
};

export default GroupFollowModal;
