export default {
	events: async (parent, args, {prisma}, info) => {
		const opArgs = {};
		if (args.query) {
			const where = {};
			if (args.query.creator) {
				where.creator.id = args.query.creator;
			}
			if (args.query.search) {
				where.OR = [
					{title_contains: args.query.search},
					{description_contains: args.query.search}
				];
			}
			if (args.query.location) {
				where.location = args.query.location;
			}
			if (args.query.minPrice) {
				where.price_gte = args.query.minPrice;
			}
			if (args.query.maxPrice) {
				where.price_lte = args.query.maxPrice;
			}
			opArgs.where = where;
		}
		return prisma.query.events(opArgs, info);
	},
	event: async (parent, args, {prisma}, info) => {
		return prisma.query.event(args.id, info);
	}
};
