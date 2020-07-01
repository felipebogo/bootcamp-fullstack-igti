import React, { Component } from 'react';

export default class InputDesiredNetSalary extends Component {
  handleChange = (event) => {
    const newValue = +event.target.value;
    this.props.onSalaryChange(newValue);
  };

  handleButtonClick = () => {
    this.props.onCalculate();
  };

  render() {
    const { currentValue, disabled } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'spaceBetween',
        }}
      >
        <div
          style={{ width: '100%', marginRight: '10px' }}
          className="input-field"
        >
          <input
            autoFocus
            id="inputDesiredNetSalary"
            type="number"
            value={currentValue}
            onChange={this.handleChange}
            min="1000"
            step="100"
            disabled={disabled}
          />
          <label className="active" htmlFor="inputDesiredNetSalary">
            Salário líquido desejado:
          </label>
        </div>

        <div>
          <button
            className="waves-effect waves-light btn"
            onClick={this.handleButtonClick}
            disabled={disabled}
          >
            Calcular
          </button>
        </div>
      </div>
    );
  }
}
