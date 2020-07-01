import React from 'react';

import css from './toggle.module.css';

export default function Toggle({ onToggle = null, description = 'Toggle' }) {
  const handleChange = (event) => {
    if (onToggle) {
      onToggle(event.target.checked);
    }
  };

  return (
    <div className={css.container}>
      <span>{description}</span>
      <div className="switch">
        <label>
          <input type="checkbox" onChange={handleChange} />
          <span className="lever"></span>
        </label>
      </div>
    </div>
  );
}
