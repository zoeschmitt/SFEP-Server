import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const app = express();
import models, { connectDb } from './models';
const port = process.env.port || 8000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', routes);

connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`App listening on port ${process.env.PORT}!`),
    );
  });

export default app;