import getUserId from '../../utils/getUserId';

export default {
	createEvent: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const data = {
			...args.data,
			price: parseFloat(args.data.price) * 1.03,
			creator: {connect: {id: userId}}
		};
		return prisma.mutation.createEvent({data}, info);
	},
	deleteEvent: async (parent, args, {prisma, req}, info) => {
		const useId = getUserId(req);
		const eventExists = await prisma.exists.Event({id: args.id});
		if (!eventExists) {
			throw new Error('Event not found');
		}
		return prisma.mutation.deleteEvent({where: {id: args.id}}, info);
	},
	updateEvent: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		return prisma.mutation.updateEvent(
			{data: args.data, where: {id: args.id}},
			info
		);
	}
};
