import React, { Component } from 'react'

export default class InputValue extends Component {

  handleOnChange = (event) => {
    return this.props.onChange(event.target.value);
  }

  render() {
    const { label, value } = this.props;
    return (
      <div>
        <label htmlFor="">{label}</label>
        <input
          value={value}
          autoFocus
          type="number"
          min="0"
          max="999999"
          step="50"
          onChange={this.handleOnChange}
        />
      </div>
    )
  }
}
