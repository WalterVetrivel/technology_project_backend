export default {
	createRequest: async (parent, args, {prisma}, info) => {
		return prisma.createRequest({data: args.data}, info);
	},
	deleteRequest: async (parent, args, {prisma}, info) => {
		const requestExists = await prisma.exists.Request({id: args.id});
		if (!requestExists) {
			throw new Error('Request not found');
		}
		return prisma.mutation.deleteRequest({where: {id: args.id}}, info);
	},
	acceptRequest: async (parent, args, {prisma}, info) => {
		const requestExists = await prisma.exists.Request({id: args.id});
		if (!requestExists) {
			throw new Error('Request not found');
		}
		const request = await prisma.request(
			{where: {id: args.id}},
			'{ id from { id } to { id } }'
		);
		await prisma.updateUser(
			{
				where: {id: request.from.id},
				data: {connections: {connect: {id: request.to.id}}}
			},
			'{id}'
		);
		await prisma.updateUser(
			{
				where: {id: request.to.id},
				data: {connections: {connect: {id: request.from.id}}}
			},
			'{id}'
		);
		await prisma.mutation.deleteRequest({where: {id: args.id}}, info);
		return 'Request accepted.';
	}
};
