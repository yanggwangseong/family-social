import { feedIdAtom } from '@/atoms/feedIdAtom';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { LayerMode } from 'types';

export const useCreateFeed = () => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);
	const [, setIsFeedId] = useRecoilState(feedIdAtom);

	const handleCreateFeed = () => {
		setIsShowing(!isShowing); // layer modal 보여주기
		setIsLayer({
			modal_title: '새 게시물 만들기',
			layer: LayerMode.createFeed,
		}); // layer modal 어떤 layer를 보여 줄건지

		setIsFeedId(''); // 수정모드 아니게 feedId 전역변수 초기화
	};

	return {
		handleCreateFeed,
	};
};
