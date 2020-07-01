import React, { Component } from 'react';

import css from './counter.module.css';
import CounterButton from './CounterButton';

export default class Counter extends Component {
  constructor() {
    super();

    /**
     * Estado do componente
     */
    this.state = {
      /**
       * Valor do contador
       */
      currentCounter: 0,

      /**
       * Registro de quantidade de cliques,
       * independente de ser decremento ou
       * incremento
       */
      steps: 0,
    };
  }

  /**
   * Método para lidar com o clique
   * do botão feito no componente
   * CounterButton
   *
   * Nesse método, chega como parâmetro
   * o tipo de clique, sendo 'danger' o
   * decremento e 'success' o incremento
   */
  handleButtonClick = (buttonType) => {
    /**
     * Obtendo o estado atual do componente
     */
    const { currentCounter, steps } = this.state;

    /**
     * Definindo se o valor será
     * decrementado ou incrementado
     */
    const newCounterValue =
      buttonType === 'danger' ? currentCounter - 1 : currentCounter + 1;

    /**
     * Atualizando o estado com setState
     * Isso acarretará no agendamento de
     * uma nova invocação do método render()
     *
     */
    this.setState({
      currentCounter: newCounterValue,
      steps: steps + 1,
    });
  };

  render() {
    /**
     * Obtendo o estado atual do componente
     */
    const { currentCounter, steps } = this.state;

    /**
     * A renderização deste componente consiste em:
     *
     * 1) Componente CounterButton do tipo 'danger', sendo
     *    que description, type e onButtonClick são exemplos
     *    de props
     * 2) Elemento <span> com o valor atual do 'currentCounter'
     * 3) Componente CounterButton do tipo 'success'
     * 4) Elemento <span> com o valor atual de 'steps'
     */
    return (
      <div className={css.counterContainer}>
        <CounterButton
          description="-"
          type="danger"
          onButtonClick={this.handleButtonClick}
        />

        <span className={css.counterValue}>{currentCounter}</span>

        <CounterButton
          description="+"
          type="success"
          onButtonClick={this.handleButtonClick}
        />

        <span className={css.steps}>({steps})</span>
      </div>
    );
  }
}
