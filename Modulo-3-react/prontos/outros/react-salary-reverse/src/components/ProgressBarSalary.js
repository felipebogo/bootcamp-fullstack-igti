import React, { Component } from 'react';

export default class ProgressBarSalary extends Component {
  render() {
    const {
      percentINSS,
      percentIRPF,
      percentNetSalary,
      colorINSS,
      colorIRPF,
      colorNetSalary,
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            backgroundColor: colorINSS,
            width: percentINSS + '%',
            height: '20px',
          }}
        ></div>

        <div
          style={{
            backgroundColor: colorIRPF,
            width: percentIRPF + '%',
            height: '20px',
          }}
        ></div>

        <div
          style={{
            backgroundColor: colorNetSalary,
            width: percentNetSalary + '%',
            height: '20px',
          }}
        ></div>
      </div>
    );
  }
}
