import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import api from '../../../api';

export default {
	login: async (parent, args, {prisma}, info) => {
		const userExists = await prisma.exists.User({email: args.data.email});
		if (!userExists) {
			throw new Error('User not found');
		}
		const user = await prisma.query.user({where: {email: args.data.email}});
		const passwordsMatch = await bcrypt.compare(
			args.data.password,
			user.password
		);
		if (!passwordsMatch) {
			throw new Error('Invalid email or password');
		}
		return {
			user,
			token: jwt.sign({userId: user.id}, api.JWT_SECRET)
		};
	}
};
