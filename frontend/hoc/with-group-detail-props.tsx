import { useGroupDetailQuery } from '@/hooks/use-query/useGroupDetailQuery';

import { GroupDetailResponse } from '@/shared/interfaces/fam.interface';
import { useRouter } from 'next/router';

export function withGroupDetailProps<P extends object>(
	WrappedComponent: React.ComponentType<
		P & { groupDetail: GroupDetailResponse }
	>,
): React.ComponentType<P> {
	const WithGroupDetailProps: React.FC<P> = props => {
		const router = useRouter();
		const { groupId } = router.query as { groupId: string };

		const { groupDetail, groupDetailLoading } = useGroupDetailQuery(groupId);

		if (groupDetailLoading) {
			return <div>로딩 중...</div>;
		}

		if (!groupDetail) {
			return null;
		}

		return <WrappedComponent groupDetail={groupDetail} {...props} />;
	};

	return WithGroupDetailProps;
}
