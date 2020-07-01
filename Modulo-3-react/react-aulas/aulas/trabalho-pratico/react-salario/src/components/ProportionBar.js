import React, { Component } from 'react';

export default class ProportionBar extends Component {
  render() {
    const {
      inss,
      irpf,
      netSalary,
      colorINSS = 'orange',
      colorIRPF = 'red',
      colorNetSalary = 'green',
    } = this.props;

    console.log(this.props);

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
            width: inss + '%',
            height: '20px',
          }}
        />
        <div
          style={{
            backgroundColor: colorIRPF,
            width: irpf + '%',
            height: '20px',
          }}
        />
        <div
          style={{
            backgroundColor: colorNetSalary,
            width: netSalary + '%',
            height: '20px',
          }}
        />
      </div>
    );
  }
}
