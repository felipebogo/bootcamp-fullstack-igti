import React from 'react';

import Avatar from './Avatar';

import css from './item.module.css';

export default function User({ item: user }) {
  return (
    <div className={css.countryFlex}>
      <Avatar data={user} />
      <span>{user.name}</span>
    </div>
  );
}
