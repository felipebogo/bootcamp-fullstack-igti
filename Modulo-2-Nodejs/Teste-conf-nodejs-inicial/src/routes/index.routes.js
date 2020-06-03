import express from 'express';
import testesRoute from './testes.routes.js';
import accountBankRoute from './accountBank.routes.js';

const routes = express.Router();

routes.use('/account',accountBankRoute);
routes.use(testesRoute);


export default routes;