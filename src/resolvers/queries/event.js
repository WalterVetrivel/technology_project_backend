export default {
	events: async (parent, args, {prisma}, info) => {
		const opArgs = {};
		if (args.query) {
			const where = {};
			if (args.query.creator) {
				where.creator = {id: args.query.creator};
			}
			if (args.query.category) {
				where.category = args.query.category;
			}
			if (args.query.notBy) {
				where.creator = {
					NOT: {
						id: args.query.notBy
					}
				};
			}
			if (args.query.search) {
				where.OR = [
					{title_contains: args.query.search},
					{description_contains: args.query.search},
					{title_contains: args.query.search.toLowerCase()},
					{description_contains: args.query.search.toLowerCase()}
				];
			} else if (args.query.location) {
				where.OR = [
					{address_contains: args.query.location},
					{city_contains: args.query.location},
					{state_contains: args.query.location},
					{country_contains: args.query.location}
				];
			}
			if (args.query.search && args.query.location) {
				where.AND = [
					{
						OR: where.OR
					},
					{
						OR: [
							{address_contains: args.query.location},
							{city_contains: args.query.location},
							{state_contains: args.query.location},
							{country_contains: args.query.location}
						]
					}
				];
			}
			if (args.query.dateAfter) {
				where.dateTime_gte = args.query.dateAfter;
			}
			if (args.query.registrationAfter) {
				where.dateTime_gte = args.query.registrationAfter;
			}
			if (args.query.isFree) {
				where.price = 0;
			} else if (args.query.maxPrice) {
				where.price_lte = args.query.maxPrice;
			}
			opArgs.where = where;
		}
		if (args.first) {
			opArgs.first = args.first;
		}
		if (args.skip) {
			opArgs.skip = args.skip;
		}
		if (args.orderBy) {
			opArgs.orderBy = args.orderBy;
		}
		return prisma.query.events(opArgs, info);
	},
	event: async (parent, args, {prisma}, info) => {
		const eventExists = prisma.exists.Event({id: args.id});
		if (!eventExists) {
			throw new Error('Event not found');
		}
		return prisma.query.event({where: {id: args.id}}, info);
	}
};
