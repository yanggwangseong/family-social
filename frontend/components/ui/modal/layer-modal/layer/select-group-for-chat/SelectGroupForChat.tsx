import React, { FC, useState } from 'react';
import styles from './SelectGroupForChat.module.scss';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useMemberBelongToGroups } from '@/hooks/use-query/useMemberBelongToGroups';
import {
	messageModalAtom,
	MessageModalAtomType,
} from '@/atoms/messageModalAtom';
import { useRecoilState } from 'recoil';
import { createMessageModalAtom } from '@/atoms/createMessageModalAtom';
import { DEFAULT_GROUP_CHAT_TYPE } from '@/constants/index';
import { useQuery } from 'react-query';
import { GroupService } from '@/services/group/group.service';
import { modalAtom } from '@/atoms/modalAtom';

const SelectGroupForChat: FC = () => {
	const [isShowing, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const [createLayer, setCreateLayer] = useRecoilState<boolean>(
		createMessageModalAtom,
	);

	const [layer, setLayer] =
		useRecoilState<MessageModalAtomType>(messageModalAtom);

	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups({ forChatCreation: true });

	const { data: member, isLoading: memberLoading } = useQuery(
		['get-members', isSelecteGroup],
		async () =>
			await GroupService.getMembersBelongToGroup(isSelecteGroup, true),
		{
			enabled: !!isSelecteGroup,
		},
	);

	const handleCreateGroupChat = () => {
		setLayer({
			chatId: '',
			isMessageModal: true,
			isNewMessage: true,
			memberIds: member ? member.map(item => item.member.id) : [],
			groupId: isSelecteGroup,
			chatType: DEFAULT_GROUP_CHAT_TYPE,
		});
		setIsShowing(false);
	};

	return (
		<LayerModalVariantWrapper>
			<div className={styles.container}>
				<div className={styles.section_title}>그룹선택</div>
				<div className={styles.section_sub_title}>그룹 채팅 만들기</div>
			</div>
			<div className={styles.selectedGroup_groups_container}>
				{data &&
					data.map(group => (
						<div className={styles.group_card_wrap} key={group.id}>
							<GroupProfile
								group={group.group}
								onSelectedGroup={handleSelectedGroup}
								isSelecteGroup={isSelecteGroup}
							/>
						</div>
					))}
			</div>

			<div className={styles.button_container}>
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customOrange text-customDark 
                    font-bold border border-solid border-customDark 
                    rounded-full p-[10px]
                    w-full hover:bg-orange-500
                    "
					onClick={handleCreateGroupChat}
				>
					채팅방 만들기
				</CustomButton>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default SelectGroupForChat;
