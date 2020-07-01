const numberFormatter = Intl.NumberFormat('pt-BR');
const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(number) {
  return numberFormatter.format(number);
}

function formatMoney(number) {
  return moneyFormatter.format(number);
}

function formatPercentage(number) {
  return `(${number.toFixed(2).replace('.', ',')}%)`;
}

export { formatNumber, formatMoney, formatPercentage };
