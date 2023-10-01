import { InvitationFields } from '@/components/screens/group/requests/invitations/invitations.interface';
import { FamInvitation } from '@/shared/interfaces/fam.interface';

export interface InvitationItemProps {
	invitation: FamInvitation;
	onAcceptInvitation: (data: InvitationFields) => void;
	onRejectInvitation: (data: InvitationFields) => void;
}
