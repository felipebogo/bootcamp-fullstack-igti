import React, { Component } from 'react';

import InputFullSalary from './components/InputFullSalary';
import InputReadOnly from './components/InputReadOnly';

import * as salaryHelpers from './helpers/salary';
import ProgressBarSalary from './components/ProgressBarSalary';

const COLOR_INSS = '#e67e22';
const COLOR_IRPF = '#c0392b';
const COLOR_NET_SALARY = '#16a085';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };

    this.salaryObject = null;
  }

  handleSalaryChange = (newSalary) => {
    this.setState({ fullSalary: newSalary });
  };

  render() {
    const { fullSalary } = this.state;

    this.salaryObject = salaryHelpers.calculateSalaryFrom(fullSalary);

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = this.salaryObject;

    const percentINSS = (discountINSS / fullSalary) * 100;
    const percentIRPF = (discountIRPF / fullSalary) * 100;
    const percentNetSalary = 100 - percentINSS - percentIRPF;

    return (
      <div className="container">
        <h1 className="center">React Salário</h1>

        <div className="row">
          <InputFullSalary
            currentValue={fullSalary}
            onSalaryChange={this.handleSalaryChange}
          />

          <InputReadOnly label="Base INSS:" value={baseINSS} />

          <InputReadOnly
            label="Desconto INSS:"
            value={discountINSS}
            percentage={percentINSS}
            color={COLOR_INSS}
          />

          <InputReadOnly label="Base IRPF:" value={baseIRPF} />

          <InputReadOnly
            label="Desconto IRPF:"
            value={discountIRPF}
            percentage={percentIRPF}
            color={COLOR_IRPF}
          />

          <InputReadOnly
            label="Salário líquido:"
            value={netSalary}
            percentage={percentNetSalary}
            color={COLOR_NET_SALARY}
          />
        </div>

        <ProgressBarSalary
          percentINSS={percentINSS}
          colorINSS={COLOR_INSS}
          percentIRPF={percentIRPF}
          colorIRPF={COLOR_IRPF}
          percentNetSalary={percentNetSalary}
          colorNetSalary={COLOR_NET_SALARY}
        />
      </div>
    );
  }
}
