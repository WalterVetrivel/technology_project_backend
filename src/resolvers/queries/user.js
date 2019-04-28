import getUserId from '../../utils/getUserId';

export default {
	users: (parent, args, {prisma}, info) => {
		const opArgs = {};
		if (args.query) {
			const where = {};
			if (args.query.name) {
				if (args.query.location) {
					where.AND = [
						{
							OR: [
								{firstName_contains: args.query.name},
								{lastName_contains: args.query.name}
							]
						},
						{
							OR: [
								{city_contains: args.query.location},
								{state_contains: args.query.location},
								{country_contains: args.query.location}
							]
						}
					];
				} else {
					where.OR = [
						{firstName_contains: args.query.name},
						{lastName_contains: args.query.name}
					];
				}
			} else if (args.query.location) {
				where.OR = [
					{city_contains: args.query.location},
					{state_contains: args.query.location},
					{country_contains: args.query.location}
				];
			}
			opArgs.where = where;
		}
		if (args.first) {
			opArgs.first = args.first;
		}
		if (args.skip) {
			opArgs.skip = args.skip;
		}
		return prisma.query.users(opArgs, info);
	},
	user: async (parent, args, {prisma}, info) => {
		const userExists = await prisma.exists.User({id: args.id});
		if (!userExists) {
			throw new Error('User not found');
		}
		return prisma.query.user({where: {id: args.id}}, info);
	},
	isRegistered: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const registrations = await prisma.query.registrations({
			where: {user: {id: userId}, event: {id: args.eventId}}
		});
		return registrations.length > 0;
	},
	isFollowing: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const users = await prisma.query.users({
			where: {
				id: userId,
				following_some: {
					id: args.userId
				}
			}
		});
		return users.length > 0;
	},
	currentUser: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const userExists = await prisma.exists.User({id: userId});
		if (!userExists) {
			throw new Error('User not found');
		}
		return prisma.query.user({where: {id: userId}}, info);
	}
};
