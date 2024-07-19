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
import { useInfiniteQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { motion } from 'framer-motion';
import TourismItem from '@/components/ui/tourism/TourismItem';
import { TourFestivalProps } from './tour-festival.interface';
import { PeriodsType } from '@/atoms/periodAtom';
import { TranslateDateFormat } from '@/utils/translate-date-format';

const Festival: FC<TourFestivalProps> = ({ onChangePeriods }) => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const [isAreaCode, setIsAreaCode] = useRecoilState(areaCodeAtom);

	const { handleChangeSelected, handleSelectToggle, isToggle, isSelected } =
		useSelect<orderSelectOptionsKeys>(optionsLists[0]);

	const [startDate, setDateRange] = useState<Date>(new Date());

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useInfiniteQuery(
		['tour-festival', startDate, isAreaCode],
		async ({ pageParam = 1 }) =>
			await TourService.searchTourFestivalList({
				numOfRows: 10,
				pageNo: pageParam,
				areaCode: isAreaCode.areaCodeMain,
				sigunguCode: isAreaCode.areaCodeSub,
				eventStartDate: TranslateDateFormat(startDate, 'yyyyMMdd'),
				isSelected,
			}),
		{
			getNextPageParam: (lastPage, allPosts) => {
				return lastPage.page !== Math.ceil(allPosts[0].totalPage / 10)
					? lastPage.page + 1
					: undefined;
			},
			enabled: !!startDate,
		},
	);

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

	const handleTourSearch = () => {
		fetchNextPage();
	};

	const handleChangePeriods = (dates: PeriodsType[]) => {
		onChangePeriods(dates);
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
			<div className={styles.search_btn_container}>
				<CustomButton
					type="button"
					className=" bg-basic text-customDark 
								font-bold border border-solid border-customDark 
								rounded-full p-[10px]
								w-full hover:bg-orange-500
								"
					onClick={handleTourSearch}
				>
					검색
				</CustomButton>
			</div>

			<div className={styles.tourism_item_container}>
				{isLoading && <Skeleton />}
				{data &&
					data.pages.map((page, pageIndex) => (
						<motion.div
							className={styles.tourism_item_wrap}
							key={pageIndex}
							initial="hidden"
							animate="visible"
							exit={{ opacity: 0, transition: { duration: 1 } }}
							variants={{
								visible: { transition: { staggerChildren: 0.1 } },
							}}
						>
							{page.list.map((tour, index: number) => (
								<TourismItem key={index} tourItem={tour} />
							))}
						</motion.div>
					))}
			</div>
		</div>
	);
};

export default Festival;
