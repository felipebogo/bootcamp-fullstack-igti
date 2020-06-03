import fs from 'fs';
const accountsPath = './src/db/accounts.json';

const { writeFile, readFile } = fs.promises;

const validateAccountFormat = (account) => {
  const { id, balance, name } = account;
  if (!(id && (balance || balance === 0) && name)) {
    throw new Error('Atributos inválidos.');
  }
}

export const initAccounts = async () => {
  try {
    await readFile(accountsPath, { encoding: 'utf-8' });
  } catch (error) {
    const accounts = { index: 1, accounts: [] }
    await writeFile(accountsPath, JSON.stringify(accounts), { encoding: 'utf-8' });
  }
}

export const getAccounts = async () => {
  const data = await readFile(accountsPath, { encoding: 'utf-8' });
  const accounts = JSON.parse(data);
  return accounts;
}

export const getAccountById = async (id) => {
  const { accounts } = await getAccounts();
  return accounts.find(({ id: accountId }) => parseInt(id) === accountId);

}

export const saveAccount = async (account) => {
  const accounts = await getAccounts();
  const newAccount = {
    id: accounts.index++,
    name: account.name,
    balance: account.balance
  }
  validateAccountFormat(newAccount);
  accounts.accounts.push(newAccount);
  await writeFile(accountsPath, JSON.stringify(accounts), { encoding: 'utf-8' });
  return newAccount;
}

export const updateAccount = async (account) => {
  const accounts = await getAccounts();
  const indexAccount = accounts.accounts.findIndex(({ id: accountId }) => parseInt(account.id) === accountId);
  if (indexAccount) {
    validateAccountFormat(account);
    const { id, balance, name } = account;
    accounts.accounts[indexAccount] = { id, balance, name };
  }
  await writeFile(accountsPath, JSON.stringify(accounts), { encoding: 'utf-8' });
}

export const accountDeposit = async (deposit) => {
  const {id,value} = deposit;
  const account = await getAccountById(id);
  if (!(account && value)) {
    throw new Error('Conta ou valor não informados.');
  }
  account.balance += value;
  await updateAccount(account);
  return {balance:account.balance};
}
export const accountWithdraw = async (withdraw) => {
  const {id,value} = withdraw;
  const account = await getAccountById(id);
  if (!(account && value)) {
    throw new Error('Conta ou valor não informados.');
  }
  if(account.balance < value){
    throw new Error(`Seu saldo ${account.balance} não é suficiente para retirar ${value}.`);
  }
  account.balance -= value;
  await updateAccount(account);
  return {balance:account.balance};
}



export const deleteAccount = async (id) => {
  const accounts = await getAccounts();
  const newAccounts = accounts.accounts.filter(({ id: accountId }) => parseInt(id) !== accountId);
  accounts.accounts = newAccounts;
  await writeFile(accountsPath, JSON.stringify(accounts), { encoding: 'utf-8' });
}


