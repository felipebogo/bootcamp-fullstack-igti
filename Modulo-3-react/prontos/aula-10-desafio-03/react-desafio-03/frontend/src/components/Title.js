import React from 'react';

/**
 * Functional Component que renderiza
 * um título centralizado com a tag <h1>
 *
 * ({ children }) é uma sintaxe mais sucinta
 * que utilizar (props) e depois {props.children}
 */
export default function Title({ children }) {
  return <h1 style={{ textAlign: 'center' }}>{children}</h1>;
}
