
import mongoose from 'mongoose';
import express from 'express';
import routes from './routes/index.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.DB_URI;

const runApp = async () => {
  const app = express();
  app.use(express.json());

  app.use(routes);

  await mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

  app.listen(3000, () => {
    console.log('servidor iniciado na portal 3000.');
  })
};

runApp();