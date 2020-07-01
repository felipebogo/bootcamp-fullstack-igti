/**
 * Importação do React e do hook useState
 */
import React, { useState, useEffect } from 'react';

/**
 * Importação de função para formatar data/hora
 */
import { getFormattedTimeStamp } from './helpers/dateTimeHelpers';

/**
 * Hooks atuam em Functional Components
 */
export default function App() {
  /**
   * Definindo o hook para arrayDatetime, cujo
   * valor se inicia vazio []
   */
  const [arrayDatetime, setArrayDateTime] = useState([]);

  /**
   * Aplicando efeito para atualizar título da
   * página com a quantidade de cliques
   */
  useEffect(() => {
    /**
     * Implementação do efeito
     */
    document.title = arrayDatetime.length.toString();
  }, [arrayDatetime]);
  /**
   * A linha acima contém [arrayDatetime]. Isso é conhecido
   * como 'array de dependências' ou 'deps'. Significa que
   * o efeito será executado sempre que houver alguma modificação
   * em arrayDatetime
   */

  /**
   * Função a ser executada no clique do botão.
   *
   * Observação importante: perceba que esta função
   * está contida em function App() {}. Esse conceito
   * é conhecido como "closure", onde a função buttonClick
   * tem acesso a todo o escopo da função App()
   */
  function buttonClick() {
    /**
     * Obtendo novo item
     */
    const newItem = `Botão clicado em ${getFormattedTimeStamp()}`;

    /**
     * Atualizando array utilizando spread operator
     */
    setArrayDateTime([...arrayDatetime, newItem]);
  }

  /**
   * Retorno do componente
   */
  return (
    <div style={{ padding: '10px' }}>
      <h1>
        React com <em>Hooks</em>
      </h1>

      <button id="button" onClick={buttonClick}>
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
