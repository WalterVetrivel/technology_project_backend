import getUserId from '../../utils/getUserId';

export default {
	users: (parent, args, {prisma}, info) => {
		const opArgs = {};
		if (args.query) {
			opArgs.where = {
				OR: [
					{
						firstName_contains: args.query
					},
					{
						lastName_contains: args.query
					}
				]
			};
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
	isFollowing: (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const users = prisma.query.users({
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
		// return prisma.query.user({where: {id: userId}}, info);
		return prisma.query.user({where: {id: userId}}, info);
	}
};
