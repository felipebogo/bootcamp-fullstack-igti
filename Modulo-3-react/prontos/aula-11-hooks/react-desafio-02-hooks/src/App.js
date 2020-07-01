import React, { useState, useEffect } from 'react';

import CountryList from './components/Countries/CountryList';

import css from './app.module.css';
import { formatNumber } from './helpers/format-helpers';

function getTotalPopulation(countries) {
  return countries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);
}

const doFetchCountries = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  return json.map((item) => {
    const { name, flag, numericCode, population, area } = item;

    return {
      id: numericCode,
      nameFilter: name.toLowerCase(),
      name,
      flag,
      population,
      area,
    };
  });
};

export default function App() {
  /**
   * Todos os países
   */
  const [allCountries, setAllCountries] = useState([]);

  /**
   * Guarda e persiste o filtro digitado
   * pelo usuário
   */
  const [filter, setFilter] = useState('');

  /**
   * Dados sobre os países filtrados
   */
  const [currentCountries, setCurrentCountries] = useState([]);
  const [countryCount, setCountryCount] = useState(0);
  const [totalPopulation, setTotalPopulation] = useState(0);

  /**
   * Boa referência para useEffect com fetch:
   * https://www.robinwieruch.de/react-hooks-fetch-data
   *
   * Resumindo: envolva a requisição em uma função e
   * execute a função logo em seguida
   */
  useEffect(() => {
    const getCountries = async () => {
      const allCountries = await doFetchCountries();
      setAllCountries(allCountries);
      setCurrentCountries(Object.assign([], allCountries));
    };

    getCountries();
  }, []); // Vai ser executada somente uma vez

  /**
   * Este useEffect é utilizado para filtrar os
   * países a partir do texto informado pelo usuário
   */
  useEffect(() => {
    const filterTextLowerCase = filter.toLowerCase();

    const currentCountries = allCountries.filter((country) => {
      return country.nameFilter.includes(filterTextLowerCase);
    });

    setCurrentCountries(currentCountries);
    setCountryCount(currentCountries.length);
    setTotalPopulation(getTotalPopulation(currentCountries));
  }, [allCountries, filter]); // Monitora alterações em allCountries e filter

  /**
   * Função que trata a alteração
   * de dados no input do filtro
   */
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  /**
   * Formatando o valor de população
   */
  const formattedPopulation = formatNumber(totalPopulation);

  /**
   * JSX do componente
   */
  return (
    <div className={css.mainContainer}>
      <div className={css.flexRow}>
        <div className="input-field">
          <input
            placeholder="Filtro"
            type="text"
            value={filter}
            onChange={handleFilter}
          />
        </div>

        <div className={css.leftRightSpace}>
          | Quantidade de países: <strong>{countryCount}</strong>
        </div>

        <div className={css.leftRightSpace}>
          | População total: <strong>{formattedPopulation}</strong>
        </div>
      </div>
      <hr />
      <div>
        <CountryList data={currentCountries} />
      </div>
    </div>
  );
}
