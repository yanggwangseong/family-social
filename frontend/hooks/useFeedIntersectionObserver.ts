import { useEffect, useState } from 'react';
import { useInfiniteSelect } from './useInfiniteSelect';
import { FeedService } from '@/services/feed/feed.service';
import { QueryFunction } from 'react-query';
import { FeedsResponse } from '@/shared/interfaces/feed.interface';

export const useFeedIntersectionObserver = <T extends FeedsResponse>(
	queryKey: string[],
	queryFn: QueryFunction<T, string[]>,
	options: 'TOP' | 'MYFEED' | 'ALL' | 'GROUPFEED' = 'TOP',
) => {
	const [observedPost, setObservedPost] = useState<string | null>(null);

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
						console.log('마지막 포스트에 왔습니다');
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
			].feedId;
		//posts 배열에 post가 추가되서 마지막 post가 바뀌었다면
		// 바뀐 post중 마지막post를 observedPost로
		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
		return () => {};
	}, [data, fetchNextPage, observedPost]);

	// Reset the observed post when options change
	useEffect(() => {
		setObservedPost(null);
	}, [options]);

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
