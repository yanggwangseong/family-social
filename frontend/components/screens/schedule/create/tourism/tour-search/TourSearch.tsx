import React, { FC, useEffect, useState } from 'react';
import styles from './TourSearch.module.scss';
import Field from '@/components/ui/field/Field';
import SelectBox from '@/components/ui/select/SelectBox';
import { useSelect } from '@/hooks/useSelect';
import { orderSelectOptionsKeys } from '../tourism.interface';
import { optionsLists } from '../tourism.constants';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useInfiniteQuery } from 'react-query';
import { TourService } from '@/services/tour/tour.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import TourismItem from '@/components/ui/tourism/TourismItem';
import { motion } from 'framer-motion';

const TourSearch: FC = () => {
	const [isKeyword, setIsKeyword] = useState<string>('');

	const { handleChangeSelected, handleSelectToggle, isToggle, isSelected } =
		useSelect<orderSelectOptionsKeys>(optionsLists[0]);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useInfiniteQuery(
		['tour-search', isKeyword, isSelected],
		async ({ pageParam = 1 }) =>
			await TourService.searchTourLists({
				numOfRows: 10,
				pageNo: pageParam,
				contentTypeId: '12',
				keyword: isKeyword,
				isSelected,
			}),
		{
			getNextPageParam: (lastPage, allPosts) => {
				return lastPage.page !== Math.ceil(allPosts[0].totalPage / 10)
					? lastPage.page + 1
					: undefined;
			},
			enabled: !!isKeyword,
		},
	);

	const handleTourSearch = () => {
		fetchNextPage();
	};

	return (
		<div className={styles.container}>
			<div className={styles.search_field_container}>
				<Field
					fieldClass={'input'}
					placeholder="키워드를 입력하세요."
					onChange={e => setIsKeyword(e.target.value)}
				></Field>
			</div>
			<div>
				<div>
					<SelectBox
						options={optionsLists}
						onChangeSelected={handleChangeSelected}
						onSelectToggle={handleSelectToggle}
						isToggle={isToggle}
						isSelected={isSelected}
						comment={`관광정보 정렬`}
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
				{data?.pages.map((page, pageIndex) => (
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

export default TourSearch;
