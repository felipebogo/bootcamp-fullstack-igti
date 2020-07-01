import React from 'react';

import Avatar from './Avatar';

import css from './item.module.css';

export default function Item({ item }) {
  return (
    <div className={css.countryFlex}>
      <Avatar data={item} />
      <span>{item.name}</span>
    </div>
  );
}
