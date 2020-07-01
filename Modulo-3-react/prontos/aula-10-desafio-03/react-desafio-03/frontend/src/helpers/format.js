/**
 * Referência ao objeto que formata números
 */
const numberFormat = Intl.NumberFormat('pt-BR');

function formatNumber(numberToBeFormatted) {
  return numberFormat.format(numberToBeFormatted);
}

function formatPercentage(numberToBeFormatted) {
  if (numberToBeFormatted) {
    return numberToBeFormatted.toFixed(2).replace('.', ',') + '%';
  }
}

export { formatNumber, formatPercentage };
