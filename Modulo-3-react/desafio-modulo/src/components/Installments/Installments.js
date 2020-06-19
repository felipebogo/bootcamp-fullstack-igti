import React, { useState, useEffect, useCallback } from 'react'
import Installment from '../Installment/Installment';

export default function Installments({ initialValue, interests, months }) {

  const [installments, setInstallments] = useState([]);

  console.log(installments);

  const calcInstallments = useCallback(
    () => {
      let acumValue = +initialValue;
      let acumInterests = 0
      const newInstallments = [];
      for (let month = 1; month <= months; month++) {
        const curMonth = month;
        const curInterests = acumValue * (interests / 100);
        acumInterests += curInterests;
        const acumPercInterests = (acumInterests / initialValue);
        acumValue += +curInterests;
        newInstallments.push(
          {
            installment: (curMonth),
            interests: (acumInterests),
            percInterests: (acumPercInterests * 100),
            acumValue: (acumValue)
          });
      }
      setInstallments(newInstallments);
    },
    [initialValue, interests, months],
  )

  useEffect(() => {
    calcInstallments();
  }, [calcInstallments])

  return (
    <div>
      <table className="striped centered">
        <thead>
          <tr>
            <th>Parcela</th>
            <th>Montante</th>
            <th>Juros</th>
            <th>Percentual Acumulado</th>
          </tr>
        </thead>

        <tbody>
          {installments.map(curInstallment => 
             (
             <tr key={curInstallment.installment}>
               <Installment installment={curInstallment}/> 
             </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
