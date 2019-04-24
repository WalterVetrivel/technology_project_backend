import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
	createUser: async (parent, args, {prisma}, info) => {
		const emailTaken = await prisma.exists.User({email: args.data.email});
		if (emailTaken) {
			throw new Error('Email taken');
		}
		if (args.data.password.length < 8) {
			throw new Error('Password must be at least 8 characters long');
		}
		const password = await bcrypt.hash(args.data.password, 10);

		const user = await prisma.mutation.createUser({
			data: {...args.data, password: password}
		});

		return {
			user,
			token: jwt.sign({userId: user.id}, 'eventbookingauthsecret')
		};
	},
	deleteUser: async (parent, args, {prisma}, info) => {
		const userExists = await prisma.exists.User({id: args.id});
		if (!userExists) {
			throw new Error('User not found');
		}
		return prisma.mutation.deleteUser({where: {id: args.id}}, info);
	},
	updateUser: async (parent, args, {prisma}, info) => {
		return prisma.mutation.updateUser(
			{data: args.data, where: {id: args.id}},
			info
		);
	}
};
