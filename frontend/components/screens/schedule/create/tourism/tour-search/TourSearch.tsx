import React, { FC } from 'react';
import styles from './TourSearch.module.scss';
import SelectBox from '@/components/ui/select/SelectBox';
import { useSelect } from '@/hooks/useSelect';
import { orderSelectOptionsKeys } from '../tourism.interface';
import { optionsLists } from '../tourism.constants';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import TourismItem from '@/components/ui/tourism/TourismItem';
import { motion } from 'framer-motion';
import { SearchService } from '@/services/search/search.service';
import SearchBoxTour from '@/components/ui/search-box/tour/SearchBoxTour';
import { useSearch } from '@/hooks/useSearch';
import NotFoundSearch from '@/components/ui/not-found/search/NotFoundSearch';
import { NOT_FOUND_TOUR_MESSAGE } from '@/constants/index';

const TourSearch: FC = () => {
	const queryClient = useQueryClient();
	const { handleSearch, debounceSearch, handleChangeSearchTerm } = useSearch();

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
		['tour-search', debounceSearch, isSelected],
		async ({ pageParam = 1 }) =>
			await SearchService.searchTourLists({
				numOfRows: 10,
				pageNo: pageParam,
				contentTypeId: '12',
				keyword: debounceSearch,
				isSelected,
			}),
		{
			getNextPageParam: (lastPage, allPosts) => {
				return lastPage.page !== Math.ceil(allPosts[0].totalPage / 10)
					? lastPage.page + 1
					: undefined;
			},
			enabled: !!debounceSearch,
			onSuccess: data => {
				queryClient.invalidateQueries(['search-recent-tour', 'tour']);
			},
		},
	);

	const handleTourSearch = () => {
		fetchNextPage();
	};

	return (
		<div className={styles.container}>
			{/* search */}
			<SearchBoxTour
				debounceSearch={debounceSearch}
				onSearch={handleSearch}
				onChangeSearchTerm={handleChangeSearchTerm}
			/>
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
				{data?.pages[0].list.length === 0 && (
					<NotFoundSearch message={NOT_FOUND_TOUR_MESSAGE} />
				)}
			</div>
		</div>
	);
};

export default TourSearch;
