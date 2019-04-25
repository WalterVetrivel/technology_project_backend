import jwt from 'jsonwebtoken';
import api from '../../api';

const getUserId = req => {
	const header = req.request.headers.authorization;
	if (!header) {
		throw new Error('Unauthenticated');
	}
	const token = header.replace('Bearer ', '').trim();
	const decodedToken = jwt.verify(token, api.JWT_SECRET);

	return decodedToken.userId;
};

export {getUserId as default};
