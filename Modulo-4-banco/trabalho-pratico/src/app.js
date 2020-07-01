
import mongoose from 'mongoose';
import express from 'express';
import routes from './routes/index.routes.js';

const uri = "mongodb+srv://admin:admin@bootcamp-igti-kmrzr.mongodb.net/trabalho-pratico?retryWrites=true&w=majority";

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