import React, { Component } from 'react';
import InputValue from './components/InputValue/InputValue';
import InputReadOnly from './components/InputReadOnly/InputReadOnly';
import './App.css';
import SalaryBar from './components/SalaryBar/SalaryBar';
import { formatMoney,formatPercentage } from './helpers/formatters';
import { calculateSalaryFrom } from './helpers/salary';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      fullSalary: "",
      baseINSS: "",
      discountINSS: "",
      baseIRPF: "",
      discountIRPF: "",
      netSalary: "",
      percentINSS: "",
      percentIRPF: "",
      percentNetSalary: ""
    };
  }

  handleSalaryChange = (newFullSalary) => {
    if(isNaN(parseFloat(newFullSalary))){
      const salary = calculateSalaryFrom(0)
      this.setState({fullSalary:"", ...salary});
      
    }else{
      const salary = calculateSalaryFrom(parseFloat(newFullSalary))
      this.setState({fullSalary:parseFloat(newFullSalary), ...salary});
    }
    

  }

  render() {
    const {
      fullSalary,
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      percentINSS,
      percentIRPF,
      percentNetSalary} = this.state;

      const formattedPercINSS = discountINSS ? `(${formatPercentage(percentINSS)})`:"";
      const formattedPercIRPF = discountIRPF ? `(${formatPercentage(percentIRPF)})`:"";
      const formattedPercNetSalary = netSalary ? `(${formatPercentage(percentNetSalary)})`:"";
      const formattedDiscountINSS = `${formatMoney(discountINSS)} ${formattedPercINSS}`;
      const formattedDiscountIRPF = `${formatMoney(discountIRPF)} ${formattedPercIRPF}`;
      const formattedNetSalary = `${formatMoney(netSalary)} ${formattedPercNetSalary}`;

    return (
      <div className="container">
        <h1>React Salário</h1>
        <InputValue
          label="Salário Bruto"
          value={fullSalary}
          onChange={this.handleSalaryChange}
        />
        <div className="rowInfo">
          <InputReadOnly label="Base INSS" value={formatMoney(baseINSS)} />
          <InputReadOnly label="Desconto INSS" value={formattedDiscountINSS} color="#e67e22" />
          <InputReadOnly label="Base IRPF" value={formatMoney(baseIRPF) } />
          <InputReadOnly label="Desconto IRPF" value={formattedDiscountIRPF} color="#c0392b" />
          <InputReadOnly label="Salário Líquido" value={formattedNetSalary} color="#16a085" />
        </div>
        <SalaryBar salaryInfo={{ fullSalary, discountINSS, discountIRPF, netSalary }} />
      </div>
    );
  }
}
