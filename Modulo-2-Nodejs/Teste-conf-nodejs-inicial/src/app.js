import express from 'express';
import routes from './routes.js';
import logger from './logger.js'
import winston from 'winston';


const app = express()
app.use(express.json());
const port = 3000;

app.use(routes);


logger.error('Error log');
logger.warn('Warn log');
logger.info('Info log');
logger.verbose('Verbose log');
logger.debug('Debug log');
logger.silly('Silly log');
logger.log('info','Allow');

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}.`);
});