/**
 * Importação do React
 */
import React, { Component } from 'react';

/**
 * Importação de função para formatar data/hora
 */
import { getFormattedTimeStamp } from './helpers/dateTimeHelpers';

/**
 * Class components em React
 * devem extender de React.Component
 */
export default class App extends Component {
  /**
   * Construtor da classe
   */
  constructor() {
    /**
     * No React, a invocação de super()
     * é obrigatória
     */
    super();

    /**
     * Definindo o estado do app, que
     * é um vetor de data/hora que se
     * inicia de forma vazia []
     */
    this.state = {
      arrayDatetime: [],
    };
  }

  /**
   * Método executado no evento de clique no botão.
   * Deve-se utilizar arrow function para evitar
   * a utilização de bind(this), que torna o código
   * mais confuso
   */
  buttonClick = () => {
    /**
     * Obtendo data/hora do clique no botão
     */
    const timestamp = getFormattedTimeStamp();

    /**
     * Obtendo cópia do vetor atual a partir do estado
     */
    const currentArray = Object.assign([], this.state.arrayDatetime);

    /**
     * Definindo o novo elemento do array
     */
    const newItem = `Botão clicado em ${timestamp}`;

    /**
     * Atualizando o estado do app
     * com o array atualizado
     */
    this.setState({
      arrayDatetime: [...currentArray, newItem],
    });
  };

  /**
   * Método do ciclo de vida do React
   * que é executado após cada render().
   * Útil para "efeitos colaterais", como
   * por exemplo, a atualização de
   * document.title
   */
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    console.log(this.state);

    document.title = this.state.arrayDatetime.length.toString();
  }

  /**
   * Méto do ciclo de vida do React que faz
   * a renderização do componente em tela
   */
  render() {
    /**
     * Obtendo vetor através de object
     * destructuring
     */
    const { arrayDatetime } = this.state;

    return (
      <div style={{ padding: '10px' }}>
        <h1>
          React com <em>Class Components</em>
        </h1>

        <button id="button" onClick={this.buttonClick}>
          Clique aqui
        </button>

        <ul id="clicks">
          {arrayDatetime.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
