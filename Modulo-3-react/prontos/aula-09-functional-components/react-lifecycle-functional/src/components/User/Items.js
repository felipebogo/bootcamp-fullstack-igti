import React, { Component } from 'react';
import Item from './Item';

import css from './items.module.css';

export default class Items extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 0,
    };

    this.interval = null;
  }

  componentDidMount() {
    console.log('componentDidMount');

    this.interval = setInterval(() => {
      const { seconds } = this.state;
      this.setState({ seconds: seconds + 1 });
    }, 1000);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.interval);
  }

  render() {
    const { values } = this.props;
    const { seconds } = this.state;

    if (!values || values.length === 0) {
      return <p>Carregando...</p>;
    }

    return (
      <div>
        <p style={{ marginTop: '10px' }}>
          Lista aberta por {seconds} segundos...
        </p>

        <div className={css.countryFlex}>
          {values.map((item) => {
            const { id } = item;
            return <Item key={id} item={item} />;
          })}
        </div>
      </div>
    );
  }
}
