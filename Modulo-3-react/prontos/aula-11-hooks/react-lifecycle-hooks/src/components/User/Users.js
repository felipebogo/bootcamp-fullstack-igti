import React, { useState, useEffect } from 'react';
import User from './User';

import css from './items.module.css';

export default function Users({ users }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      /**
       * Aqui há uma variação da utilização de setSeconds,
       * onde NÃO utilizamos a variável de estado diretamente
       * e sim uma FUNÇÃO que passa o valor atual do estado como
       * parâmetro. Assim, o useEffect continua não precisando de
       * deps
       */
      setSeconds((s) => s + 1);
    }, 1000);

    /**
     * Esse retorno simula o comportamento do
     * componentWillUnmount
     */
    return () => clearInterval(interval);
  }, []);

  if (users.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <p style={{ marginTop: '10px' }}>
        Lista aberta por {seconds} segundos...
      </p>

      <div className={css.countryFlex}>
        {users.map((user) => {
          const { id } = user;
          return <User key={id} item={user} />;
        })}
      </div>
    </div>
  );
}
