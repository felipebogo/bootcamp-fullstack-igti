import React from 'react';

import FlipMove from 'react-flip-move';
import Candidate from './Candidate';

export default function Candidates({ candidates }) {
  /**
   * Para cada candidato, renderizamos o componente
   * <Candidate>, que recebe o item e a posição. É
   * muito importante informar key, cujo valor é o id
   * do item do objeto. Isso permite uma performance
   * melhor por parte do React.
   *
   * <FlipMove> faz parte do pacote 'react-flip-move' e
   * é utilizado para mover elementos de forma animada,
   * caso a ordem dos mesmos seja modificada.
   */
  return (
    <FlipMove>
      {candidates.map((candidate, index) => {
        return (
          <div key={candidate.id}>
            <Candidate candidate={candidate} position={index + 1} />
          </div>
        );
      })}
    </FlipMove>
  );
}
