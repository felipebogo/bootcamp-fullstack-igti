import React, { Component } from 'react';

import css from './items.module.css';
import User from './User';

export default class Users extends Component {
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
      const { users } = this.props;
      const { seconds } = this.state;

      if (users.length > 0) {
        this.setState({ seconds: seconds + 1 });
      }
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
    const { users } = this.props;
    const { seconds } = this.state;

    if (!users || users.length === 0) {
      return <p>Carregando...</p>;
    }

    return (
      <div>
        <p style={{ marginTop: '10px' }}>
          Lista aberta por {seconds} segundos...
        </p>

        <div className={css.countryFlex}>
          {users.map((user) => {
            const { id } = user;
            return <User key={id} user={user} />;
          })}
        </div>
      </div>
    );
  }
}
