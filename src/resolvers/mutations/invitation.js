export default {
	createInvitation: async (parent, args, {prisma}, info) => {
		return prisma.createInvitation({data: args.data}, info);
	},
	deleteInvitation: async (parent, args, {prisma}, info) => {
		const invitationExists = await prisma.exists.Invitation({id: args.id});
		if (!invitationExists) {
			throw new Error('Invitation not found');
		}
		return prisma.mutation.deleteInvitation({where: {id: args.id}}, info);
	}
};
