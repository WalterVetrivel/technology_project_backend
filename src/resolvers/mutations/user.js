export default {
	createUser: async (parent, args, {prisma}, info) => {
		const emailTaken = await prisma.exists.User({email: args.data.email});
		if (emailTaken) {
			throw new Error('Email taken');
		}
		return prisma.mutation.createUser({data: args.data}, info);
	},
	deleteUser: async (parent, args, {prisma}, info) => {
		const userExists = await prisma.exists.User({id: args.id});
		if (!userExists) {
			throw new Error('User not found');
		}
		return prisma.mutation.deleteUser({where: {id: args.id}}, info);
	},
	updateUser: async (parent, args, {prisma}, info) => {
		return prisma.mutation.updateUser(
			{data: args.data, where: {id: args.id}},
			info
		);
	}
};
