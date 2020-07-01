
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import express from 'express';
import routes from './routes/index.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;


const appMongoDb = async () => {
  const { MongoClient } = mongodb;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect(async (err) => {
    const collection = client.db("grades").collection("student");
    const data = await collection.find().toArray();
    console.log(data);
    client.close();
  });
}

const appMongoose = async () => {
  await mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  const studentSchema = mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    subject: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    value: {
      type: String,
      require: Number
    },
    lastModified: {
      type: Date,
      require: true,
      default: Date.now()
    },
  });

  mongoose.model('student', studentSchema, 'student');

  const student = mongoose.model('student');

  const newStudent = new student({
    name: 'Mario Assis',
    subject: 'Ingles',
    type: 'Prova',
    value: 15
  });

  const res = await newStudent.save();

  console.log('inseriu pessoa', newStudent, 'resulado: ', res);

  //await mongoose.close();

}

const appCrud = async () => {
  const app = express();
  app.use(express.json());

  app.use(routes);

  await mongoose.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  app.listen(3000, () => {
    console.log('servidor iniciado na portal 3000.');
  })
};

//appMongoDb(); 
//appMongoose();
appCrud();