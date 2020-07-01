import React, { Component } from 'react';

import css from './toggle.module.css';

export default class Toggle extends Component {
  handleChange = (event) => {
    const { onToggle } = this.props;

    if (onToggle) {
      onToggle(event.target.checked);
    }
  };

  render() {
    const { description } = this.props;

    /**
     * Layout obtido a partir da documentação
     * do Materialize CSS - https://materializecss.com/switches.html
     */
    return (
      <div className={css.container}>
        <span>{description}</span>
        <div className="switch">
          <label>
            <input type="checkbox" onChange={this.handleChange} />
            <span className="lever"></span>
          </label>
        </div>
      </div>
    );
  }
}
