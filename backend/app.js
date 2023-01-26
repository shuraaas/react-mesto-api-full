import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

dotenv.config();
const { PORT = 3000 , DB_ADDRESS } = process.env;
const app = express();

app.use(cors());
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log('server is running'));
