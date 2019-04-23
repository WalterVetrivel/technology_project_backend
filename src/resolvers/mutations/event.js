export default {
	createEvent: async (parent, args, {prisma}, info) => {
		return prisma.mutation.createEvent({data: args.data}, info);
	},
	deleteEvent: async (parent, args, {prisma}, info) => {
		const eventExists = await prisma.exists.Event({id: args.id});
		if (!eventExists) {
			throw new Error('Event not found');
		}
		return prisma.mutation.deleteEvent({where: {id: args.id}}, info);
	},
	updateEvent: async (parent, args, {prisma}, info) => {
		return prisma.mutation.updateEvent(
			{data: args.data, where: {id: args.id}},
			info
		);
	}
};
