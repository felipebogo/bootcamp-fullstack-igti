import React, { Component } from 'react';
import Counter from './components/counter/Counter';

export default class App extends Component {
  /**
   * Renderizo abaixo 3 componentes Counter.
   * Perceba que eles são independentes, ou seja
   * cada um deles gerencia o seu próprio estado
   */
  render() {
    return (
      <div>
        <Counter />
        <Counter />
        <Counter />
      </div>
    );
  }
}
