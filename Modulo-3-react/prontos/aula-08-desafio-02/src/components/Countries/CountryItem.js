import React, { Component } from 'react';

import css from './country-item.module.css';

export default class CountryItem extends Component {
  render() {
    const { id, flag, name } = this.props.item;

    return (
      <div className={css.countryItemContainer} id={id}>
        <img className={css.flag} src={flag} alt={name} />
        {name}
      </div>
    );
  }
}
