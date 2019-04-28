import getUserId from '../../utils/getUserId';

export default {
	followUser: async (parent, args, {prisma, req}, info) => {
		const followerId = getUserId(req);
		const followerExists = await prisma.exists.User({id: followerId});
		const followingExists = await prisma.exists.User({id: args.followingId});
		if (!followerExists || !followingExists) {
			throw new Error('User not found.');
		}
		await prisma.mutation.updateUser({
			where: {id: followerId},
			data: {following: {connect: {id: args.followingId}}}
		});
		return 'Followed';
	},
	unfollowUser: async (parent, args, {prisma, req}, info) => {
		const followerId = getUserId(req);
		const followerExists = await prisma.exists.User({id: followerId});
		const followingExists = await prisma.exists.User({id: args.followingId});
		if (!followerExists || !followingExists) {
			throw new Error('User not found.');
		}
		await prisma.mutation.updateUser({
			where: {id: followerId},
			data: {following: {disconnect: {id: args.followingId}}}
		});
		return 'Unfollowed';
	}
};
