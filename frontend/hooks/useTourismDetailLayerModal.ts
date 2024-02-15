import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { tourDetailAtom } from '@/atoms/tourDetailAtom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { LayerMode } from 'types';

export const useTourismDetailLayerModal = (tourismTitle: string) => {
	const [isContentIdTypeId, setIsContentIdTypeId] =
		useRecoilState(tourDetailAtom);

	const [isShowing, setIsShowing] = useRecoilState(modalAtom);

	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const handleTourismDetailLayerModal = (
		contentId: string,
		contentTypeId: string,
	) => {
		setIsContentIdTypeId({
			contentId: contentId,
			contentTypeId: contentTypeId,
		});
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: tourismTitle,
			layer: LayerMode.tourismDetail,
		});
	};
	return {
		handleTourismDetailLayerModal,
	};
};
