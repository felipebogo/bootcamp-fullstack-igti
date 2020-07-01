import React, { useState, useEffect } from 'react';

import ApiService from './services/ApiService';

import Title from './components/Title';
import Candidates from './components/Candidates';

/**
 * App definido como um Functional Component
 */
export default function App() {
  /**
   * useState(s)
   */
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const api = new ApiService('http://localhost:8080');

      const voteData = await api.getVotes();
      const { candidates, totalVotes } = voteData;
      const newCandidates = handleCandidates(candidates, totalVotes);

      setCandidates(newCandidates);
      setTotalVotes(totalVotes);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [candidates, totalVotes]);

  const handleCandidates = (candidates) => {
    /**
     * Transformando o vetor de candidados atual
     */
    return candidates.map((candidate) => {
      /**
       * Extraindo id
       */
      const { id } = candidate;

      /**
       * Obtendo o candidato no estado anterior
       * ao atual, utilizando this.state
       */
      // prettier-ignore
      const previousCandidate = 
        candidates.find((item) => item.id === id);

      /**
       * Montando o objeto com os dados atuais, cálculo de percentual
       * atualizado, votos anteriores e percentual anterior
       *
       * Os dados "de anteriormente" são importantes para a animação
       * de incremento número nos votos e percentual
       */
      return {
        ...candidate,
        previousVotes: !!previousCandidate ? previousCandidate.votes : 0,
        previousPercentage: !!previousCandidate
          ? previousCandidate.percentage
          : 0,
      };
    });
  };

  /**
   * Quebramos o app em dois componentes principais:
   * Title e Candidates, sendo que este último é
   * subdividido em diversos outros componentes
   */
  return (
    <>
      <Title>Votação</Title>
      <Candidates candidates={candidates} />
    </>
  );
}
