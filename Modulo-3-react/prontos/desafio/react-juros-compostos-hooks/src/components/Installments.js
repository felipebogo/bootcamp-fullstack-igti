import React from 'react';
import Installment from './Installment';

export default function Installments({ installments }) {
  return (
    <div className="row">
      {installments.map((installment) => {
        return <Installment key={installment.id} installment={installment} />;
      })}
    </div>
  );
}
