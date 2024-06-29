import { useEffect, useState } from 'react';
import { useInfiniteSelect } from './useInfiniteSelect';

import { GroupEventItemResponse } from '@/shared/interfaces/group-event.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import { QueryFunction } from 'react-query';

export const useGroupEventItemIntersectionObserver = <
	T extends BasicPaginationResponse<GroupEventItemResponse>,
>(
	queryKey: string[],
	queryFn: QueryFunction<T, string[]>,
) => {
	const [observedPost, setObservedPost] = useState('');

	const {
		data,
		isLoading,
		isRefetching,
		fetchNextPage,
		hasNextPage,
		isError,
		refetch,
	} = useInfiniteSelect(queryKey, queryFn);

	useEffect(() => {
		const observeElement = (element: HTMLElement | null) => {
			if (!element) return;
			// 브라우저 viewport와 설정한 요소(Element)와 교차점을 관찰
			const observer = new IntersectionObserver(
				// entries는 IntersectionObserverEntry 인스턴스의 배열
				entries => {
					console.log('entries', entries);
					// isIntersecting: 관찰 대상의 교차 상태(Boolean)
					if (entries[0].isIntersecting === true) {
						fetchNextPage();
						observer.unobserve(element); //이전에 observe 하고 있던걸 없애준다.
					}
				},
				{ threshold: 1 },
			);
			// 대상 요소의 관찰을 시작
			observer.observe(element);
		};

		//포스트가 없다면 return
		if (
			!data?.pages[data?.pages.length - 1].list ||
			data?.pages[data?.pages.length - 1].list.length === 0
		)
			return;
		//posts 배열안에 마지막 post에 id를 가져옵니다.
		const id =
			data?.pages[data?.pages.length - 1].list[
				data?.pages[data?.pages.length - 1].list.length - 1
			]['id'];
		//posts 배열에 post가 추가되서 마지막 post가 바뀌었다면
		// 바뀐 post중 마지막post를 observedPost로
		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
		return () => {};
	}, [data, fetchNextPage, observedPost]);

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	};
};
