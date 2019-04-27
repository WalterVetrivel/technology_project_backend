import getUserId from '../../utils/getUserId';

export default {
	registrations: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const opArgs = {};
		const where = {};
		if (args.event) {
			where.event = {id: args.event};
		}
		if (args.user) {
			where.user = {id: args.user};
		}
		if (args.first) {
			opArgs.first = args.first;
		}
		if (args.skip) {
			opArgs.skip = args.skip;
		}
		if (args.orderBy) {
			opArgs.orderBy = args.orderBy;
		}
		return prisma.query.registrations(opArgs, info);
	},
	userRegistrations: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const opArgs = {};
		if (args.first) {
			opArgs.first = args.first;
		}
		if (args.skip) {
			opArgs.skip = args.skip;
		}
		if (args.orderBy) {
			opArgs.orderBy = args.orderBy;
		}
		opArgs.where = {user: {id: userId}};
		return prisma.query.registrations(opArgs, info);
	},
	eventRegistrations: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const eventExists = prisma.exists.Event({id: args.event});
		if (!eventExists) {
			throw new Error('Event not found');
		}
		const event = await prisma.query.event(
			{where: {id: args.event}},
			`{creator {id}}`
		);
		if (event.creator.id !== userId) {
			throw new Error('Unauthorized');
		}
		const opArgs = {};
		if (args.first) {
			opArgs.first = args.first;
		}
		if (args.skip) {
			opArgs.skip = args.skip;
		}
		if (args.orderBy) {
			opArgs.orderBy = args.orderBy;
		}
		opArgs.where = {event: {id: args.event}};
		return prisma.query.registrations(opArgs, info);
	}
};
