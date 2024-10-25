import React, { FC } from 'react';
import EmailInvite from './layer/email-invite/EmailInvite';
import LinkInvite from './layer/link-invite/LinkInvite';
import { LayerMode, Union } from 'types';
import GroupDeleteConfirm from './layer/GroupDeleteConfirm';
import CreateFeed from './layer/CreateFeed/CreateFeed';
import FeedDeleteConfirm from './layer/FeedDeleteConfirm';
import CommentDeleteConfirm from './layer/CommentDeleteConfirm';
import LogOutConfirm from './layer/LogOutConfirm';
import EditProfile from './layer/EditProfile/EditProfile';
import ContentType from './layer/create-schedule/content-type/ContentType';
import ServiceCategory from './layer/create-schedule/service-category/ServiceCategory';
import AreaCode from './layer/create-schedule/area-code/AreaCode';
import TourismDetail from './layer/tourism-detail/TourismDetail';
import ScheduleDeleteConfirm from './layer/ScheduleDeleteConfirm';
import ScheduleThumbnailImage from './layer/schedule-thumbnail-image/ScheduleThumbnailImage';
import SuccessLayerModal from './layer/success-layer-modal/SuccessLayerModal';
import GroupEventDeleteConfirm from './layer/GroupEventDeleteConfirm';
import CreateEventContainer from './layer/create-event/CreateEventContainer';
import SelectGroupForChat from './layer/select-group-for-chat/SelectGroupForChat';
import CreateVideoCall from './layer/create-video-call/CreateVideoCall';

const StatusLookUpTable = {
	[LayerMode.emailInvite]: EmailInvite,
	[LayerMode.linkInvite]: LinkInvite,
	[LayerMode.groupDeleteConfirm]: GroupDeleteConfirm,
	[LayerMode.createFeed]: CreateFeed,
	[LayerMode.feedDeleteConfirm]: FeedDeleteConfirm,
	[LayerMode.commentDeleteConfirm]: CommentDeleteConfirm,
	[LayerMode.logoutConfirm]: LogOutConfirm,
	[LayerMode.editProfile]: EditProfile,
	[LayerMode.selectedContentType]: ContentType,
	[LayerMode.serviceCategory]: ServiceCategory,
	[LayerMode.areaCode]: AreaCode,
	[LayerMode.tourismDetail]: TourismDetail,
	[LayerMode.scheduleDeleteConfirm]: ScheduleDeleteConfirm,
	[LayerMode.scheduleThumbnailImage]: ScheduleThumbnailImage,
	[LayerMode.successLayerModal]: SuccessLayerModal,
	[LayerMode.createEvent]: CreateEventContainer,
	[LayerMode.groupEventDeleteConfirm]: GroupEventDeleteConfirm,
	[LayerMode.selectGroupForChat]: SelectGroupForChat,
	[LayerMode.createVideoCall]: CreateVideoCall,
};

interface StatusProps {
	status: Union<typeof LayerMode>;
}

const LayerModalControll: FC<StatusProps> = ({ status }) => {
	if (typeof StatusLookUpTable[status] !== 'undefined') {
		return React.createElement(StatusLookUpTable[status]);
	}
	return <div>오류가 발생했습니다. 고객센터로 문의 바랍니다.</div>;
};

export default LayerModalControll;
