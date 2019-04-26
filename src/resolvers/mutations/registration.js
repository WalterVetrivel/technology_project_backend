import getUserId from '../../utils/getUserId';
import api from '../../../api';

export default {
	createRegistration: async (parent, args, {prisma, req}, info) => {
		const userId = getUserId(req);
		const eventExists = await prisma.exists.Event({
			id: args.data.event
		});
		if (!eventExists) {
			throw new Error('Event not found');
		}
		const event = await prisma.query.event(
			{where: {id: args.data.event}},
			`{paymentInfo price title}`
		);
		if (event.price !== 0 && !args.data.paymentInfo) {
			throw new Error('Payment information is missing');
		}
		const totalPrice = Math.round(event.price * args.data.guestCount * 100);
		// Charge card based on args.paymentInfo
		const stripe = require('stripe')(api.STRIPE_TEST_KEY);
		try {
			const charge = await stripe.charges.create({
				amount: totalPrice,
				currency: 'aud',
				source: args.data.paymentInfo,
				description: `Tickets for ${event.title} via Event Booker`
			});
			// Pay card stored in event's paymentInfo
			const payoutPrice = Math.round(
				(event.price / 1.1) * args.data.guestCount * 100
			);
			/* const payout = await stripe.payouts.create({
				amount: payoutPrice,
				currency: 'aud',
				destination: event.paymentInfo,
				description: `Registration for ${event.title} via Event Booker`,
				method: 'instant'
			});
			console.log(payout); */
			const data = {
				...args.data,
				user: {
					connect: {
						id: userId
					}
				},
				event: {
					connect: {
						id: args.data.event
					}
				}
			};
			const registration = await prisma.mutation.createRegistration(
				{data},
				info
			);
			// Email receipt
			return registration;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	deleteRegistration: async (parent, args, {prisma}, info) => {
		const registrationExists = await prisma.exists.Registration({id: args.id});
		if (!registrationExists) {
			throw new Error('Registration not found');
		}
		return prisma.mutation.deleteRegistration({where: {id: args.id}}, info);
	}
};
