import 'dotenv/config';

const jwt = process.env.JWT_SECRET ?? 'secreto';
export { jwt };
