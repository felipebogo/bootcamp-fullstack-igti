import React, { Component } from 'react';

/**
 * Importação de CSS no formato de módulo
 */
import css from './counter.module.css';

/**
 * Class Component para Counter
 */
export default class Counter extends Component {
  /**
   * Se utilizarmos o construtor,
   * devemos obrigatoriamente
   * invocar super();
   */
  constructor() {
    super();

    /**
     * Atributo de classe.
     * Pouco útil no React.
     */
    this.currentCounter = 2;
  }

  /**
   * Método render()
   */
  render() {
    /**
     * Renderização de:
     *
     * 1) Botão -
     * 2) Valor do contador
     * 3) Botão +
     */
    return (
      <div className={css.counterContainer}>
        <button className="waves-effect waves-light btn red  darken-4">
          -
        </button>

        <span className={css.counterValue}>{this.currentCounter}</span>

        <button className="waves-effect waves-light btn green darken-4">
          +
        </button>
      </div>
    );
  }
}
