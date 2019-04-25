import getUserId from '../../utils/getUserId';

export default {
	createRegistration: async (parent, args, { prisma, req }, info) => {
		const userId = getUserId(req);
		const data = {
			...args.data,
			user: {connect: {id: userId}},
			event: {connect: {id: args.data.event}}
		};
		return prisma.mutation.createRegistration({data}, info);
	},
	deleteRegistration: async (parent, args, {prisma}, info) => {
		const registrationExists = await prisma.exists.Registration({id: args.id});
		if (!registrationExists) {
			throw new Error('Registration not found');
		}
		return prisma.mutation.deleteRegistration({where: {id: args.id}}, info);
	}
};
