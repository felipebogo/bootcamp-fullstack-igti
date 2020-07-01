import React from 'react';
import Card from './Card';
import CardItem from './CardItem';
import Avatar from './Avatar';
import CardPosition from './CardPosition';
import Statistics from './Statistics';

export default function Candidate({ candidate, position }) {
  /**
   * Extraindo id e name para facilitar
   * a utilização mais abaixo
   */
  const { id, name } = candidate;

  /**
   * Montando a url da imagem a partir do id
   */
  const imageURL = id + '.jpg';

  /**
   * Este componente é representado através
   * de um card com apoio do Materialize, e
   * possui 4 itens, definidos por <CardItem>
   */
  return (
    <Card>
      <CardItem>
        <CardPosition>{position}</CardPosition>
      </CardItem>

      <CardItem>
        <Avatar imageURL={imageURL} name={name} />
      </CardItem>

      <CardItem>
        <Statistics candidate={candidate} />
      </CardItem>
    </Card>
  );
}
