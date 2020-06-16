import React, { Component } from 'react'

export default class InputReadOnly extends Component {

  render() {
    const { label, value, color } = this.props;
    return (
      <div style={{minWidth:"50px", maxWidth:"170px"}}>
        <label htmlFor="">{label}</label>
        <input value={value} style={{color:color, fontWeight:"bold"}} type="text" readOnly />
      </div>
    )
  }
}
