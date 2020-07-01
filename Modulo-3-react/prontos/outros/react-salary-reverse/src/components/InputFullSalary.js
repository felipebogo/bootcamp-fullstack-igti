import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleChange = (event) => {
    const newValue = +event.target.value;
    this.props.onSalaryChange(newValue);
  };

  render() {
    const { currentValue, disabled } = this.props;

    return (
      <div className="input-field">
        <input
          id="inputFullSalary"
          type="text"
          value={currentValue}
          onChange={this.handleChange}
          readOnly={disabled}
        />
        <label className="active" htmlFor="inputFullSalary">
          Salário bruto
        </label>
      </div>
    );
  }
}
