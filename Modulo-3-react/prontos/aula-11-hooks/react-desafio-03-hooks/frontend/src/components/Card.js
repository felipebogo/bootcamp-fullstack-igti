import React from 'react';

/**
 * Componente container que representa
 * visualmente um card com apoio do
 * Materialize, através das classNames
 * card e space
 *
 * A className "flex-row" foi definida em
 * index.css e é, portanto, global ao app
 */
export default function Card({ children }) {
  return <div className="card space flex-row">{children}</div>;
}
