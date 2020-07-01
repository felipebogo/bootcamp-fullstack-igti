import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: Number,
    validate(value){
      if(value < 0){
        throw new Error('Valor menor que zero não permitido.');
      }
    }
  },
  lastModified: {
    type: Date,
    required: true,
    default: Date.now
  },
});

const studentModel = mongoose.model('student', studentSchema, 'student');

export default studentModel;