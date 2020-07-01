import React, { Component } from 'react';

import Avatar from './Avatar';

import css from './item.module.css';

export default class User extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className={css.countryFlex}>
        <Avatar data={user} />
        <span>{user.name}</span>
      </div>
    );
  }
}
