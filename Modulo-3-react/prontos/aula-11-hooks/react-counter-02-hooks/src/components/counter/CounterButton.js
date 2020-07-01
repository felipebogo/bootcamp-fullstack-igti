import React from 'react';

export default function CounterButton({
  type = 'danger',
  description = 'Valor',
  onButtonClick = null,
}) {
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

  /**
   * Processando o clique do botão
   */
  const handleClick = () => {
    /**
     * Invocando a prop onButtonClick e
     * passando "type" como parâmetro
     */
    if (onButtonClick) {
      onButtonClick(type);
    }
  };

  return (
    <button className={colorClass} onClick={handleClick}>
      {description}
    </button>
  );
}
