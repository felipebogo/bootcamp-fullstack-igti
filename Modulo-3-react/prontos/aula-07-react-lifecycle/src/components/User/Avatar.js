import React, { Component } from 'react';

import css from './avatar.module.css';

export default class Avatar extends Component {
  render() {
    const { picture, name } = this.props.data;

    return <img className={css.image} src={picture} alt={name} />;
  }
}
