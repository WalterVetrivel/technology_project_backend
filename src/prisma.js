import {Prisma} from 'prisma-binding';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://192.168.99.100:3000/',
	secret: 'thisismysupersecrettext'
});

export {prisma as default};
