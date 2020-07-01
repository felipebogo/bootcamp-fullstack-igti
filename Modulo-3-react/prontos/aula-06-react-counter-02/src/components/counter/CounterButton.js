import React, { Component } from 'react';

export default class CounterButton extends Component {
  /**
   * Processando o clique do botão
   */
  handleClick = () => {
    /**
     * Obtendo os dados através de props
     */
    const { type = 'danger', onButtonClick = null } = this.props;

    /**
     * Invocando a prop onButtonClick e
     * passando "type" como parâmetro
     */
    if (onButtonClick) {
      onButtonClick(type);
    }
  };

  render() {
    /**
     * Desestruturando as props e utilizando
     * um valor default caso elas não
     * sejam enviadas pelo componente pai
     */
    const { type = 'danger', description = 'Valor' } = this.props;

    /**
     * Definição da cor do botão
     * com base na prop "type"
     */
    let colorClass =
      type === 'danger'
        ? 'red darken-4'
        : type === 'success'
        ? 'green darken-4'
        : '';

    /**
     * Classes do Materialize
     */
    colorClass += ' waves-effect waves-light btn';

    return (
      <button className={colorClass} onClick={this.handleClick}>
        {description}
      </button>
    );
  }
}
