import { tourDetailAtom } from '@/atoms/tourDetailAtom';
import { TourService } from '@/services/tour/tour.service';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export const useTourAdditionalExplanation = () => {
	const isContentIdTypeId = useRecoilValue(tourDetailAtom);

	const { data, isLoading } = useQuery(
		['tour-additional-explanation', isContentIdTypeId.contentId],
		async () =>
			await TourService.getAdditionalExplanation({
				contentId: isContentIdTypeId.contentId,
				contentTypeId: isContentIdTypeId.contentTypeId,
				pageNo: '1',
				numOfRows: '10',
			}),
	);

	return {
		data: data?.list,
	};
};
