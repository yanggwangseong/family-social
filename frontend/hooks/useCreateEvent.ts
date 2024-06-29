import {
	groupEventIdAtom,
	groupEventIdAtomDefaultValue,
} from '@/atoms/groupEventIdAtom';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { LayerMode } from 'types';

export const useCreateEvent = () => {
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsGroupEventId] = useRecoilState(groupEventIdAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);

	const handleCreateEvent = () => {
		setIsGroupEventId(groupEventIdAtomDefaultValue);
		setIsShowing(!isShowing); // layer modal 보여주기
		setIsLayer({
			modal_title: '이벤트 만들기',
			layer: LayerMode.createEvent,
		}); // layer modal 어떤 layer를 보여 줄건지
	};

	return {
		handleCreateEvent,
	};
};
