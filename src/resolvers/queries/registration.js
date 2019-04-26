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
	}
};
