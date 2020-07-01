import express from 'express';
import accountsRoute from './accounts.routes.js';

const routes = express.Router();

routes.use('/accounts',accountsRoute);


export default routes;