import React, { Component } from 'react';

import css from './country-list.module.css';

import CountryItem from './CountryItem';

export default class CountryList extends Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return <h4>Carregando...</h4>;
    }

    if (data.length === 0) {
      return <h4>Nenhum país foi encontrado com esse filtro.</h4>;
    }

    return (
      <div className={css.container}>
        <h2 className="title">Países</h2>

        <ul className={css.ulContainer}>
          {data.map((item) => {
            const { id } = item;

            return (
              <li key={id} className={css.liContainer}>
                <CountryItem item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
