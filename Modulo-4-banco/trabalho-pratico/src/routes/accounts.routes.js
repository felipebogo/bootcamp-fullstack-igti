import express from 'express';
import accountModel from '../models/account.js';

const accountsRoute = express.Router();

accountsRoute.get('/', async (req, res) => {
  try {
    const { agencia, conta, name, balance } = req.query;
    let filter = {};
    agencia ? filter.agencia = agencia : null;
    conta ? filter.conta = conta : null;
    name ? filter.name = name : null;
    balance || balance === 0 ? filter.balance = balance : null;

    const accounts = await accountModel.find(filter);
    res.send(accounts);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.get('/mediaPorAgencia/:agencia', async (req, res) => {
  try {
    const filter = +req.params.agencia !== 0 ? { $match: { agencia: +req.params.agencia } } 
    : {$match: { }};
    const aggr = { $group: { _id: "$agencia", media: { $avg: "$balance" } } };
    const mediaResult = await accountModel.aggregate([ filter,aggr]).sort({_id:1});
    res.send(mediaResult);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.get('/clientesMenorSaldo/:limit', async (req, res) => {
  try {
    const sort = { balance: 1 };
    const result = await accountModel.find().sort(sort).limit(+req.params.limit);
    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.get('/clientesMaiorSaldo/:limit', async (req, res) => {
  try {
    const sort = { balance: -1, name: 1 };
    const result = await accountModel.find().sort(sort).limit(+req.params.limit);
    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.post('/transfereRicos', async (req, res) => {
  try {
    const match = { $match: { agencia: { $ne: 99 } } };
    const aggr = { $group: { _id: "$agencia", maior: { $max: "$balance" } } };
    const maioresResult = await accountModel.aggregate([match,aggr]).sort({ _id: 1 });
    let maisRicos = [];
    const options = {
      runValidators: true,
      new: true
    };
    for (let index = 0; index < maioresResult.length; index++) {
      const { _id: agencia, maior } = maioresResult[index];
      const sort = { balance: -1, name: 1 };
      const filter = { agencia, balance: maior };
      const rico = await accountModel.findOneAndUpdate(filter, { agencia: 99 }, options).sort(sort);
      maisRicos.push(rico);
    }
    res.send(maisRicos);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.patch('/deposito/:agencia/:conta', async (req, res) => {
  try {
    const { agencia, conta } = req.params;

    const paramBalance = +req.body.balance;
    if (paramBalance < 0) {
      throw new Error('Balance deve ser maior que zero.');
    }

    const query = { agencia: agencia, conta: conta };
    const options = {
      runValidators: true,
      new: true
    };

    const foundAccount = await accountModel.findOne(query);

    if (!foundAccount) {
      res.status(404).end();
    }

    const newBalance = foundAccount.balance + paramBalance;
    const update = { balance: newBalance };

    const result = await accountModel.findOneAndUpdate(query, update, options);

    if (!result) {
      res.status(404).end();
    }
    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.put('/transferencia', async (req, res) => {
  try {
    const {
      contaOrig,
      contaDest,
      valor
    } = req.body;

    const options = {
      runValidators: true,
      new: true
    };

    const queryOrig = { conta: contaOrig };
    const queryDest = { conta: contaDest };

    const accountOrig = await accountModel.findOne(queryOrig);

    if (!accountOrig) {
      res.status(404).send('Conta origem não localizada');
    }
    const accountDest = await accountModel.findOne(queryDest);

    if (!accountDest) {
      res.status(404).send('Conta destino não localizada');
    }

    let vlTotalOrig = +valor;
    if (accountOrig.agencia !== accountDest.agencia) {
      vlTotalOrig += 8;
    }

    if (accountOrig.balance < vlTotalOrig) {
      res.status('500').send('Não há saldo suficiente para realizar transferência.');
    }


    const updateOrig = { balance: accountOrig.balance - vlTotalOrig };
    const updateDest = { balance: accountDest.balance + valor };

    const result = await accountModel.findOneAndUpdate(queryOrig, updateOrig, options);
    await accountModel.findOneAndUpdate(queryDest, updateDest, options);


    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.patch('/saque/:agencia/:conta', async (req, res) => {
  try {
    const { agencia, conta } = req.params;

    const paramBalance = +req.body.balance;
    if (paramBalance < 0) {
      throw new Error('Balance deve ser maior que zero.');
    }

    const query = { agencia: agencia, conta: conta };
    const options = {
      runValidators: true,
      new: true
    };

    const foundAccount = await accountModel.findOne(query);

    if (!foundAccount) {
      res.status(404).end();
    }

    const newBalance = foundAccount.balance - paramBalance - 1;
    const update = { balance: newBalance };

    const result = await accountModel.findOneAndUpdate(query, update, options);

    if (!result) {
      res.status(404).end();
    }
    res.send(result);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.get('/:agencia/:conta', async (req, res) => {
  try {
    const { agencia, conta } = req.params;

    const query = { agencia: agencia, conta: conta };
    const foundAccount = await accountModel.findOne(query);

    if (!foundAccount) {
      res.status(404).end();
    }

    res.send(foundAccount);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountsRoute.delete('/:agencia/:conta', async (req, res) => {
  try {
    const { agencia, conta } = req.params;

    const query = { agencia: agencia, conta: conta };

    await accountModel.findOneAndDelete(query);

    const result = await accountModel.countDocuments({agencia: agencia});

    res.send({contas:result});

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



export default accountsRoute;