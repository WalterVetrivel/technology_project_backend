export default {
	createRegistration: async (parent, args, {prisma}, info) => {
		return prisma.mutation.createRegistration({data: args.data}, info);
	},
	deleteRegistration: async (parent, args, {prisma}, info) => {
		const registrationExists = await prisma.exists.Registration({id: args.id});
		if (!registrationExists) {
			throw new Error('Registration not found');
		}
		return prisma.mutation.deleteRegistration({where: {id: args.id}}, info);
	}
};
