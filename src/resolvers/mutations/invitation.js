import getUserId from '../../utils/getUserId';

export default {
	createInvitation: async (parent, args, {prisma}, info) => {
		const userId = getUserId();
		const data = {
			sender: {
				connect: {
					id: userId
				}
			},
			receiver: {
				connect: {
					id: args.receiver
				}
			},
			event: {
				connect: {
					id: args.event
				}
			}
		};
		return prisma.createInvitation({data}, info);
	}
};
