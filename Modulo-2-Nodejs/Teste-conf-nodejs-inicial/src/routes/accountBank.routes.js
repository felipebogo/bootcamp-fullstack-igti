import express from 'express';
import {
  saveAccount,
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
  accountDeposit,
  accountWithdraw
} from '../db/accounts.js';



const accountBankRoutes = express.Router();

accountBankRoutes.post('/', async (req, res) => {
  try {
    const { name, balance } = req.body;
    const savedAccount = await saveAccount({ name, balance });
    res.send(savedAccount);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountBankRoutes.put('/', async (req, res) => {
  try {
    const account = req.body;
    await updateAccount(account);
    res.end();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountBankRoutes.post('/deposit', async (req, res) => {
  try {
    const deposit = req.body;
    const newBalance = await accountDeposit(deposit);
    res.send(newBalance);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountBankRoutes.post('/withdraw', async (req, res) => {
  try {
    const withdraw = req.body;
    const newBalance = await accountWithdraw(withdraw);
    res.send(newBalance);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

accountBankRoutes.get('/', async (_req, res) => {
  try {
    const { accounts } = await getAccounts();
    res.send(accounts);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

});

accountBankRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const account = await getAccountById(id);
    if (account) {
      res.send(account);
    }
    res.status(404).end();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

});

accountBankRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAccount(id);
    res.end();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

});



export default accountBankRoutes;