import React from 'react';

import css from './country-item.module.css';

export default function CountryItem({ item }) {
  const { id, flag, name } = item;

  return (
    <div className={css.countryItemContainer} id={id}>
      <img className={css.flag} src={flag} alt={name} />
      {name}
    </div>
  );
}
