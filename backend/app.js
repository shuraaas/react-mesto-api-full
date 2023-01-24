import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(bodyParser.json());
app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server run on http://127.0.0.1:${PORT}/`));
