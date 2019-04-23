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
	user: (parent, args, {prisma}, info) => {
		return prisma.query.user(args.id, info);
	}
};
