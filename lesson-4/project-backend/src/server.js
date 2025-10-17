import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDatabase } from './db/connectDatabase.js';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import contactsRoutes from './routes/contactsRoutes.js';

const app = express(); 

app.use(cors());
// app.use(logger);
app.use(express.json());

app.use("/contacts", contactsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;

await connectDatabase();

app.listen(port, () => console.log(`Server running 3000 port`));
