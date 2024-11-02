import { GroupService } from '@/services/group/group.service';

import { GroupAccessLevelUnionType } from '@/shared/interfaces/fam.interface';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export function withGroupDetailProps<P extends object>(
	WrappedComponent: React.ComponentType<
		P & { groupAccessLevel: GroupAccessLevelUnionType }
	>,
): React.ComponentType<P> {
	const WithGroupDetailProps: React.FC<P> = props => {
		const router = useRouter();
		const { groupId } = router.query as { groupId: string };

		const { data, isLoading } = useQuery(
			['get-group-access-level', groupId],
			async () => await GroupService.getGroupAccessLevel(groupId),
			{
				enabled: !!groupId,
			},
		);

		if (isLoading) {
			return <div>로딩 중...</div>;
		}

		if (!data) {
			return null;
		}

		return <WrappedComponent groupAccessLevel={data} {...props} />;
	};

	return WithGroupDetailProps;
}
