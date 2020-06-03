'use strict';
import express from 'express';
import routes from './routes/index.routes.js';
import logger from './logger.js'
import {initAccounts} from './db/accounts.js';
import cors from 'cors';

import swagger from 'swagger-ui-express';
import docsAccount from './docs/accounts.js';


const app = express()
app.use(express.json());
app.use(cors());
const port = 3000;


app.use(express.static('public'));
app.use('/images', express.static('public'));
app.use(routes);

app.use('/account-docs',swagger.serve,swagger.setup(docsAccount));




/* logger.error('Error log');
logger.warn('Warn log');
logger.info('Info log');
logger.verbose('Verbose log');
logger.debug('Debug log');
logger.silly('Silly log'); */
logger.log('info', 'Iniciou');

app.listen(port, async() => {
  await initAccounts();
  console.log(`Ouvindo na porta ${port}.`);
});