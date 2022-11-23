import express, {Application} from 'express';
import nodemailer from './routes/nodemailer';
import cors from 'cors';

const app : Application = express();

app.use(cors());
app.use(express.json());
app.use(nodemailer);

export default app;
