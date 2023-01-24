import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';

const { PORT, DB_ADDRESS } = process.env;
const app = express();

app.use(cors());
mongoose.connect(DB_ADDRESS);
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
