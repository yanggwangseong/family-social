import { LottieRefCurrentProps } from 'lottie-react';

export interface GroupDetailFormatProps {
	lottieLike: boolean;
	groupId: string;
	handleLottieComplete?: () => void;
	lottieRef?: React.RefObject<LottieRefCurrentProps>;
	page: 'GROUPFEED' | 'GROUPMEMBER' | 'GROUPEVENT';
}
