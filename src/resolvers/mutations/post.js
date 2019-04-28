import getUserId from '../../utils/getUserId';

export default {
	createPost: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		return prisma.mutation.createPost(
			{
				data: args.data,
				author: {connect: {id: userId}, event: {connect: {id: args.data.event}}}
			},
			info
		);
	},
	deletePost: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const postExists = await prisma.exists.Post({id: args.id});
		if (!postExists) {
			throw new Error('Post not found');
		}
		return prisma.mutation.deletePost({where: {id: args.id}}, info);
	},
	updatePost: async (parent, args, {prisma}, info) => {
		return prisma.mutation.updatePost(
			{data: args.data, where: {id: args.id}},
			info
		);
	}
};
