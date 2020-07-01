import express from 'express';
import studentModel from '../models/student.js';

const gradesControlRoute = express.Router();

gradesControlRoute.get('/', async (req, res) => {
  try {
    const students = await studentModel.find();
    res.send(students);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
gradesControlRoute.post('/', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    const result = await student.save();
    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

gradesControlRoute.delete('/:id', async (req, res) => {
  try {
    const result = await studentModel.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).end();
    }
    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
gradesControlRoute.put('/', async (req, res) => {
  try {
    const newStudent = { ...req.body, lastModified: Date.now() };

    const result = await studentModel.findOneAndUpdate(req.body._id, newStudent,
      { new: true, useFindAndModify: false });

    if (!result) {
      res.status(404).end();
    }
    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



export default gradesControlRoute;