import express from 'express';
import gradesControlRoute from './gradesControl.routes.js';

const routes = express.Router();

routes.use('/gradesControl',gradesControlRoute);


export default routes;