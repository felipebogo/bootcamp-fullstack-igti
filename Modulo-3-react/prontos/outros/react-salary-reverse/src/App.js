import React, { Component } from 'react';

import InputFullSalary from './components/InputFullSalary';
import InputReadOnly from './components/InputReadOnly';

import * as salaryHelpers from './helpers/salary';
import ProgressBarSalary from './components/ProgressBarSalary';
import InputDesiredNetSalary from './components/InputDesiredNetSalary';

const COLOR_INSS = '#e67e22';
const COLOR_IRPF = '#c0392b';
const COLOR_NET_SALARY = '#16a085';

export default class App extends Component {
  constructor() {
    super();

    const fullSalary = 1098.9;

    this.state = {
      fullSalary,
      desiredNetSalary: 1000,
      calculatingSalary: false,
      salaryObject: salaryHelpers.calculateSalaryFrom(fullSalary),
    };

    this.interval = null;
  }

  handleDesiredSalaryChange = (newSalary) => {
    this.setState({ desiredNetSalary: newSalary });
  };

  handleSalaryChange = (newSalary) => {
    this.setState({ fullSalary: newSalary });
  };

  handleCalculation = () => {
    const { desiredNetSalary } = this.state;

    this.setState(
      { calculatingSalary: true, fullSalary: desiredNetSalary },
      () => {
        this.interval = setInterval(() => {
          const { fullSalary } = this.state;

          const salaryObject = salaryHelpers.calculateSalaryFrom(fullSalary);

          if (salaryObject.netSalary >= desiredNetSalary) {
            clearInterval(this.interval);
            this.setState({ calculatingSalary: false, salaryObject });
            return;
          }

          const step = desiredNetSalary - salaryObject.netSalary > 5 ? 1 : 0.01;
          const newValue = +(fullSalary + step).toFixed(2);
          this.setState({ fullSalary: newValue, salaryObject });
        }, 1);
      }
    );
  };

  render() {
    const {
      fullSalary,
      desiredNetSalary,
      calculatingSalary,
      salaryObject,
    } = this.state;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = salaryObject;

    const percentINSS = (discountINSS / fullSalary) * 100;
    const percentIRPF = (discountIRPF / fullSalary) * 100;
    const percentNetSalary = 100 - percentINSS - percentIRPF;

    return (
      <div className="container">
        <h1 className="center">React Salário</h1>

        <div className="row">
          <div className="col s12">
            <InputDesiredNetSalary
              currentValue={desiredNetSalary}
              onSalaryChange={this.handleDesiredSalaryChange}
              onCalculate={this.handleCalculation}
              disabled={calculatingSalary}
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <InputFullSalary
              currentValue={fullSalary}
              onSalaryChange={this.handleSalaryChange}
              disabled={calculatingSalary}
            />
          </div>
        </div>

        <div className="row">
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
