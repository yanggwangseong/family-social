export interface FeedContainerProps {
	options: 'TOP' | 'MYFEED' | 'ALL' | 'GROUPFEED';
	handleIsLottie: (status: boolean) => void;
	groupId?: string;
}
