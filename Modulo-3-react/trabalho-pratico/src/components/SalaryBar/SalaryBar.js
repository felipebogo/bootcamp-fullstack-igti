import React, { Component } from 'react'
import Bar from '../Bar/Bar'
import css from './salaryBar.module.css';

export default class SalaryBar extends Component {
  render() {

    const {
      discountINSS,
      discountIRPF,
      fullSalary,
      netSalary,
    } = this.props.salaryInfo;

    const percInss = (discountINSS / fullSalary) * 100;
    const percIrpf = (discountIRPF / fullSalary) * 100;
    const percSalary = (netSalary / fullSalary) * 100;

    return (
      <div className={css.flexColBar}>
        <Bar value={percInss} color="#e67e22" />
        <Bar value={percIrpf} color="#c0392b" />
        <Bar value={percSalary} color="#16a085" />
      </div>
    )
  }
}
