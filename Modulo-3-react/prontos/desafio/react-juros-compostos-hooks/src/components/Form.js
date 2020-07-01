import React from 'react';

export default function Form({ data, onChangeData }) {
  const { initialValue, monthlyInterest, monthlyPeriod } = data;

  const handleChangeInitialValue = (event) => {
    onChangeData(+event.target.value, null, null);
  };

  const handleChangeMonthlyInterest = (event) => {
    onChangeData(null, +event.target.value, null);
  };

  const handleChangeMonthlyPeriod = (event) => {
    onChangeData(null, null, +event.target.value);
  };

  const rowClassName = 'col input-field s6 m4 l4';

  return (
    <div className="center row">
      <div className={rowClassName}>
        <input
          id="inputInitialValue"
          type="number"
          className="validate"
          value={initialValue}
          min="100"
          step="100"
          onChange={handleChangeInitialValue}
        />
        <label htmlFor="inputInitialValue" className="active">
          Montante inicial:
        </label>
      </div>

      <div className={rowClassName}>
        <input
          id="inputMonthlyInterest"
          type="number"
          className="validate"
          value={monthlyInterest}
          step="0.1"
          onChange={handleChangeMonthlyInterest}
        />
        <label htmlFor="inputMonthlyInterest" className="active">
          Taxa de juros mensal:
        </label>
      </div>

      <div className={rowClassName}>
        <input
          id="inputMonthlyPeriod"
          type="number"
          className="validate"
          value={monthlyPeriod}
          min="1"
          step="1"
          onChange={handleChangeMonthlyPeriod}
        />
        <label htmlFor="inputMonthlyPeriod" className="active">
          Período (meses):
        </label>
      </div>
    </div>
  );
}
