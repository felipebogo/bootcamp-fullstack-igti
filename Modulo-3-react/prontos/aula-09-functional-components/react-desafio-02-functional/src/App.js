import React, { Component } from 'react';

import CountryList from './components/Countries/CountryList';

import css from './app.module.css';
import { getTotalPopulation } from './helpers/reduce-helpers';
import { formatNumber } from './helpers/format-helpers';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      currentCountries: [],
      filter: '',
      countryCount: 0,
      totalPopulation: 0,
      formattedPopulation: '0',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const countries = json.map((item) => {
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

    const totalPopulation = getTotalPopulation(countries);

    this.setState({
      allCountries: countries,
      countries,
      countryCount: countries.length,
      totalPopulation,
      formattedPopulation: formatNumber(totalPopulation),
    });
  }

  handleFilter = (event) => {
    const filterText = event.target.value;
    const filterTextLowerCase = filterText.toLowerCase();

    this.setState({ filter: filterText });

    let { countries, allCountries } = this.state;

    countries = allCountries.filter((country) => {
      return country.nameFilter.includes(filterTextLowerCase);
    });

    const totalPopulation = getTotalPopulation(countries);

    this.setState({
      countries,
      countryCount: countries.length,
      totalPopulation,
      formattedPopulation: formatNumber(totalPopulation),
    });
  };

  render() {
    const { countries, filter, countryCount, formattedPopulation } = this.state;

    return (
      <div className={css.mainContainer}>
        <div className={css.flexRow}>
          <div className="input-field">
            <input
              placeholder="Filtro"
              type="text"
              value={filter}
              onChange={this.handleFilter}
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
          <CountryList data={countries} />
        </div>
      </div>
    );
  }
}
