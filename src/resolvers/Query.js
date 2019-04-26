import UserQueries from './queries/user';
import EventQueries from './queries/event';
import RegistrationQueries from './queries/registration';

export default {
	...UserQueries,
	...EventQueries,
	...RegistrationQueries
};
