const formatter = new Intl.NumberFormat('pt-BR');

function formatNumber(numberToFormat) {
  return formatter.format(numberToFormat);
}

export { formatNumber };
