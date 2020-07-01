import React from 'react';

import css from './avatar.module.css';

export default function Avatar({ data }) {
  const { picture, name } = data;

  return <img className={css.image} src={picture} alt={name} />;
}
