import React from 'react';

/**
 * Componente container que representa
 * visualmente um item do card. As classNames
 * item e card-title pertencem ao Materialize CSS
 */
export default function CardItem({ children }) {
  return <span className="item card-title">{children}</span>;
}
