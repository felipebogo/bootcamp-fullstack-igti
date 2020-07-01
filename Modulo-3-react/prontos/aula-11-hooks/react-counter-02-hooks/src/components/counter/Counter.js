import React, { useState } from 'react';

import css from './counter.module.css';
import CounterButton from './CounterButton';

export default function Counter() {
  /**
   * Utilizando useState para counter
   */
  const [counter, setCounter] = useState(0);

  /**
   * Utilizando useState para steps
   */
  const [steps, setSteps] = useState(0);

  /**
   * Função do tipo closure para lidar com
   * o clique do botão
   */
  const handleButtonClick = (buttonType) => {
    /**
     * Definindo se o valor será
     * decrementado ou incrementado
     */
    const newCounter = buttonType === 'danger' ? counter - 1 : counter + 1;

    /**
     * Modificando estado de newCounterVale e steps.
     */
    setCounter(newCounter);
    setSteps(steps + 1);
  };

  return (
    <div className={css.counterContainer}>
      <CounterButton
        description="-"
        type="danger"
        onButtonClick={handleButtonClick}
      />

      <span className={css.counterValue}>{counter}</span>

      <CounterButton
        description="+"
        type="success"
        onButtonClick={handleButtonClick}
      />

      <span className={css.steps}>({steps})</span>
    </div>
  );
}
