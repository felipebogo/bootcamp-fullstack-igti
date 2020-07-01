import React from 'react';
import Counter from './components/counter/Counter';

function App() {
  /**
   * Renderizo abaixo 3 componentes Counter.
   * Perceba que eles são independentes, ou seja
   * cada um deles gerencia o seu próprio estado
   */
  return (
    <div>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
