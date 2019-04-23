import UserMutation from './mutations/user';
import EventMutation from './mutations/event';
import RegistrationMutation from './mutations/registration';
import PostMutation from './mutations/post';
import CommentMutation from './mutations/comment';
import InvitationMutation from './mutations/invitation';
import RequestMutation from './mutations/request';

export default {
	...UserMutation,
	...EventMutation,
	...RegistrationMutation,
	...PostMutation,
	...CommentMutation,
	...InvitationMutation,
	...RequestMutation
};
