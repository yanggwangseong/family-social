import { AcceptInvitationFields } from '@/components/screens/group/requests/invitations/invitations.interface';
import { FamInvitation } from '@/shared/interfaces/fam.interface';

export interface InvitationItemProps {
	invitation: FamInvitation;
	onAcceptInvitation: (data: AcceptInvitationFields) => void;
	onRejectInvitation: (data: AcceptInvitationFields) => void;
}
