const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatMoney(value) {
  return moneyFormatter.format(value);
}

function formatMoneyPositiveNegative(value) {
  const money = moneyFormatter.format(value);

  if (value >= 0) {
    return `+${money}`;
  }

  return money;
}

function formatPercent(value) {
  if (!value) {
    return '';
  }
  return value.toFixed(2).replace('.', ',') + '%';
}

export { formatMoney, formatPercent, formatMoneyPositiveNegative };
