import express from 'express';
import gradesControlRepository from '../repositories/gradesControlRepository.js';

const gradesControlRoute = express.Router();
const gradesRep = gradesControlRepository();

gradesControlRoute.get('/getStudentBySubject', async(req,res)=>{
  try {
    const {student, subject} = req.query;
    const grades = await gradesRep.getStudentBySubject({subject,student});
    if (grades.length===0){
      res.status(404).end();
    }
    res.send(grades);
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});

gradesControlRoute.get('/getTotalStudentBySubject', async(req,res)=>{
  try {
    const {student, subject} = req.query;
    const total = await gradesRep.getTotalStudentBySubject({subject,student});
    res.send({total});
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});

gradesControlRoute.get('/getGradesBySubjectType', async(req,res)=>{
  try {
    const {type, subject} = req.query;
    const grades = await gradesRep.getGradesBySubjectType({subject,type});
    if (grades.length===0){
      res.status(404).end();
    }
    res.send(grades);
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});

gradesControlRoute.get('/getAverageBySubjectType', async(req,res)=>{
  try {
    const {type, subject} = req.query;
    const average = await gradesRep.getAverageBySubjectType({subject,type});
    res.send({average});
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});

gradesControlRoute.get('/getBestGradesBySubjectType', async(req,res)=>{
  try {
    const {type, subject} = req.query;
    const bestGrades = await gradesRep.getBestGradesBySubjectType({subject,type});
    res.send(bestGrades.slice(0,3));
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});

gradesControlRoute.get('/:id',async (req,res)=>{
  try {
    const grade = await gradesRep.getGradeById(req.params.id);
    if(!grade){
      res.status(404).end();
    }
    res.send(grade);
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});

gradesControlRoute.post('/',async (req,res)=>{
  try {
    const {student, subject, type, value} = req.body;
    const grade = await gradesRep.saveGrade({student,subject,type,value});
    res.send(grade);
    
  } catch (error) {
    res.status(505).send({error:error.message});
  }
});

gradesControlRoute.put('/',async (req,res)=>{
  try {
    const {id, student, subject, type, value} = req.body;
    await gradesRep.updateGrade({id,student,subject,type,value});
    res.end();
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});

gradesControlRoute.delete('/:id',async (req,res)=>{
  try {
    await gradesRep.deleteGrade(req.params.id);
    res.end();
    
  } catch (error) {
    res.status(500).send({error:error.message});
  }
});




export default gradesControlRoute;