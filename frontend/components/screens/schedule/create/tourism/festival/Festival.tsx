import React, { FC, useEffect, useState } from 'react';
import styles from './Festival.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { areaCodeAtom, areaCodeDefaultValue } from '@/atoms/areaCodeAtom';
import SelectBox from '@/components/ui/select/SelectBox';
import { optionsLists } from '../tourism.constants';
import { useSelect } from '@/hooks/useSelect';
import { orderSelectOptionsKeys } from '../tourism.interface';

const Festival: FC = () => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isAreaCode, setIsAreaCode] = useRecoilState(areaCodeAtom);

	const { handleChangeSelected, handleSelectToggle, isToggle, isSelected } =
		useSelect<orderSelectOptionsKeys>(optionsLists[0]);

	const [startDate, setDateRange] = useState<Date>(new Date());

	const handleChange = (dates: Date) => {
		setDateRange(dates);
	};

	const handleSelectedAreaCode = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '지역 선택',
			layer: LayerMode.areaCode,
		});
	};

	useEffect(() => {
		return () => {
			setIsAreaCode(areaCodeDefaultValue);
		};
	}, [setIsAreaCode]);

	return (
		<div className={styles.container}>
			<div className={styles.selected_type_container}>
				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className=" bg-basic text-customDark 
                        font-bold border border-solid border-customDark 
                        rounded-full p-[10px]
                        w-full hover:bg-orange-500
                        "
						onClick={handleSelectedAreaCode}
					>
						지역
					</CustomButton>
				</div>
				<div className={styles.description_container}>
					{isAreaCode.areaCodeMain && `시/도: ${isAreaCode.areaCodeMainName}, `}
					{isAreaCode.areaCodeSub && `시/군/구: ${isAreaCode.areaCodeSubName}`}
				</div>
			</div>
			<div>행사 시작일</div>
			<DatePicker
				locale={ko}
				dateFormat="yyyy-MM-dd"
				selected={startDate}
				startDate={startDate}
				onChange={handleChange}
				showIcon
			/>
			<div>
				<div>
					<SelectBox
						options={optionsLists}
						onChangeSelected={handleChangeSelected}
						onSelectToggle={handleSelectToggle}
						isToggle={isToggle}
						isSelected={isSelected}
						comment={`행사정보 정렬`}
					></SelectBox>
				</div>
			</div>
		</div>
	);
};

export default Festival;
