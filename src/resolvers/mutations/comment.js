export default {
	createComment: async (parent, args, {prisma}, info) => {
		return prisma.mutation.createComment({data: args.data}, info);
	},
	deleteComment: async (parent, args, {prisma}, info) => {
		const commentExists = await prisma.exists.Comment({id: args.id});
		if (!commentExists) {
			throw new Error('Comment not found');
		}
		return prisma.mutation.deleteComment({where: {id: args.id}}, info);
	},
	updateComment: async (parent, args, {prisma}, info) => {
		return prisma.mutation.updateComment(
			{data: args.data, where: {id: args.id}},
			info
		);
	}
};
