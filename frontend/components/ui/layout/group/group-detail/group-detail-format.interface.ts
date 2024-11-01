import { GroupAccessLevelUnionType } from '@/shared/interfaces/fam.interface';
import { LottieRefCurrentProps } from 'lottie-react';

export interface GroupDetailFormatProps {
	groupId: string;
	handleLottieComplete?: () => void;
	lottieRef?: React.RefObject<LottieRefCurrentProps>;
	page: 'GROUPFEED' | 'GROUPMEMBER' | 'GROUPEVENT';
	groupAccessLevel: GroupAccessLevelUnionType;
}
