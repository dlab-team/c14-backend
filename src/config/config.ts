import 'dotenv/config';
import { createTransport } from 'nodemailer';

const port = process.env.PORT;
createTransport({
  service: 'gmail',
  port,
  auth: {
    user: process.env.G_MAIL,
    pass: process.env.G_PASS,
  },
});
const jwt = process.env.JWT_SECRET ?? 'secreto';

export { jwt, createTransport };
