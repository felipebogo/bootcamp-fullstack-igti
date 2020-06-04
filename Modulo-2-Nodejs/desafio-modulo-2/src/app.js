'use strict';
import express from 'express';
import routes from './routes/index.routes.js';



const app = express()
app.use(express.json());
const port = 3000;

app.use(routes);

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}.`);
});