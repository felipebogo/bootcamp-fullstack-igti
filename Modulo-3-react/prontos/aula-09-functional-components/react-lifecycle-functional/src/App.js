import React, { Component } from 'react';
import Toggle from './components/Toggle/Toggle';
import Items from './components/User/Items';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      showData: false,
      items: [],
    };

    this.interval = null;
  }

  handleToggle = (checked) => {
    this.setState({
      showData: checked,
    });
  };

  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );
    const json = await res.json();

    const items = json.results.map((item) => {
      const { name, picture, login } = item;

      return {
        id: login.uuid,
        name: name.first,
        picture: picture.large,
      };
    });

    setTimeout(() => {
      this.setState({ items });
    }, 5000);
  }

  render() {
    const { showData, items } = this.state;

    return (
      <div style={{ padding: '10px' }}>
        <h1>Abra o console!</h1>

        <div>
          <Toggle description="Exibir lista" onToggle={this.handleToggle} />
        </div>

        {showData && <Items values={items} />}
      </div>
    );
  }
}
