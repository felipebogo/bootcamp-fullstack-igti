import express from 'express';

const routes = express.Router();

routes.use((_req, _res,next) => {
  console.log('executou midleware');
  next();
});

routes.use('/',(_req, _res,next) => {
  console.log('executou midleware na rota root');
  next();
});

routes.get('/', (req, res) => {
  res.send("hello World 2");
});

const call1 = (_req, res, next) => {
  console.log('call1');
  next();
};
const call2 = (_req, res) => {
  console.log('call2');
  res.end();
};

routes.get('/multicall', [call1, call2]);

routes.all('/all', (req, res) => {
  res.send(req.method);
});

routes.get('/urlParam/:a/:b', (req, res) => {
  res.send(`parametros: ${req.params.a},${req.params.b}`);
});

routes.route('/route').get((_req, res) => {
  res.send('route get');
}
).post((_req, res) => {
  res.send('route post');
})  ;


export default routes;