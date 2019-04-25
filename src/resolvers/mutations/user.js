import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import api from '../../../api';
import {getUserId} from '../../utils/getUserId';

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

		/* sgMail.setApiKey(api.SENDGRID_API_KEY);
		const msg = {
			to: user.email,
			from: 'eventbooker@eb.com',
			subject: 'Welcome to Event Booker',
			text: `Hi ${
				user.firstName
			}, thanks for joining Event Booker. Start creating your events today or explore events you're interested in.`
		};
		sgMail.send(msg); */

		return {
			user,
			token: jwt.sign({userId: user.id}, api.JWT_SECRET)
		};
	},
	deleteUser: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const userExists = await prisma.exists.User({id: userId});
		if (!userExists) {
			throw new Error('User not found');
		}
		return prisma.mutation.deleteUser({where: {id: userId}}, info);
	},
	updateUser: async (parent, args, {prisma}, info) => {
		const userId = getUserId(req);
		const userExists = await prisma.exists.User({id: userId});
		if (!userExists) {
			throw new Error('User not found');
		}
		return prisma.mutation.updateUser(
			{data: args.data, where: {id: userId}},
			info
		);
	}
};
