import React, { FC, useState } from 'react';
import styles from './SelectGroupForChat.module.scss';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useMemberBelongToGroups } from '@/hooks/use-query/useMemberBelongToGroups';

const SelectGroupForChat: FC = () => {
	// const [layer, setLayer] =
	// 	useRecoilState<MessageModalAtomType>(messageModalAtom);

	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups();

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
								group={{
									id: group.group.id,
									groupDescription: group.group.groupDescription,
									groupName: group.group.groupName,
								}}
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
				>
					채팅방 만들기
				</CustomButton>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default SelectGroupForChat;
