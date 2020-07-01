import React from 'react';

/**
 * Caracteres que são utilizados
 * no componente
 */
const goodStar = '★';
const badStar = '☆';

/**
 * Componente para representar a popularidade
 * do candidato
 */
export default function Stars({ level, max }) {
  /**
   * Montando a string de estrelas de forma
   * que a pontuação (estrela cheia) seja
   * renderizada primeiro. O método
   * String.repeat repete o valor da string n vezes
   */
  const popularityString = goodStar.repeat(level) + badStar.repeat(max - level);

  return (
    <span
      style={{
        color: '#e67e22',
        fontWeight: 'bold',
        fontSize: '2rem',
        marginTop: '5px',
      }}
    >
      {popularityString}
    </span>
  );
}
