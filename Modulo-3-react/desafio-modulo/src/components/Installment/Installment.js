import React from 'react'
import { formatMoney, formatPercentage } from '../../helpers/formatters';

export default function Installment(props) {
  const { installment } = props;
  const {
    installment: installmentNumber,
    interests,
    percInterests,
    acumValue } = installment;

    const styleInterests = {color: interests > 0 ? "#00b894" : "#d63031"} 
    const stylePercentage = {color: percInterests > 0 ? "#00b894" : "#d63031"} 

  return (
    <>
      <td>{installmentNumber}</td>
      <td >{formatMoney(acumValue)}</td>
      <td style={styleInterests} >{formatMoney(interests)}</td>
      <td style={stylePercentage} >{formatPercentage(percInterests)}</td>
    </>
  )
}
