import React, { FC } from 'react';
import styles from './SelectGroup.module.scss';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { SelectGroupProps } from './select-group.interface';
import { Union, schdulePages } from 'types';

const SelectGroup: FC<SelectGroupProps> = ({
	onChangePage,
	data,
	handleSelectedGroup,
	isSelecteGroup,
}) => {
	const handleChangePage = (page: Union<typeof schdulePages>) => {
		onChangePage(page);
	};

	return (
		<div className={styles.select_group_container}>
			<div className={styles.top_title_container}>
				<div className={styles.step_title}>STEP 1</div>
				<div className={styles.selectedGroup_title}>그룹선택</div>
			</div>
			<div className={styles.selectedGroup_groups_container}>
				{data.map(group => (
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
					onClick={() => handleChangePage('periodPage')}
				>
					다음
				</CustomButton>
			</div>
		</div>
	);
};

export default SelectGroup;
