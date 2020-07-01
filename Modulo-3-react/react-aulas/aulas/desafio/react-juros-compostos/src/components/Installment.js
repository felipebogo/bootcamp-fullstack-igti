import React from 'react';

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatMoneyPositiveNegative(value) {
  const money = moneyFormatter.format(value);

  if (value >= 0) {
    return `+${money}`;
  }

  return money;
}

function formatMoney(value) {
  return moneyFormatter.format(value);
}

function formatPercent(value) {
  return value.toFixed(2).replace('.', ',') + '%';
}

export default function Installment({ data }) {
  const { id, value, difference, percentage, profit } = data;

  const classGoodValue = 'green-text darken-4';
  const classGoodPercent = 'blue-text darken-4';
  const classBadValue = 'red-text darken-4';
  const classBadPercent = 'orange-text darken-4';

  const classValue = profit ? classGoodValue : classBadValue;
  const classPercent = profit ? classGoodPercent : classBadPercent;

  return (
    <div className="col s6 m3 l2">
      <div style={styles.flexRow}>
        <span style={{ marginRight: '5px' }}>
          <strong>{id}</strong>
        </span>

        <div>
          <div className={classValue}>
            <strong>{formatMoney(value)}</strong>
          </div>

          <div className={classValue}>
            <strong>{formatMoneyPositiveNegative(difference)}</strong>
          </div>

          <div className={classPercent}>
            <strong>{formatPercent(percentage)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    border: '1px solid lightgray',
    borderRadius: '4px',
    padding: '4px',
    margin: '4px',
  },
};
