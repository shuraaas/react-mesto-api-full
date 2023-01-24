import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';

dotenv.config();
const { PORT, DB_ADDRESS } = process.env;
const app = express();

console.log(process.env.NODE_ENV);

app.use(cors());
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server run on http://127.0.0.1:${PORT}/`));
