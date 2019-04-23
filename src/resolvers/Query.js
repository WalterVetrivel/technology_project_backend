import UserQueries from './queries/user';
import EventQueries from './queries/event';

export default {
	...UserQueries,
	...EventQueries
};
