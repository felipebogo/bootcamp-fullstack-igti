import React from 'react';

/**
 * Functional Component para definir o nome
 * do candidato com negrito e tamanho de
 * 1.5rem
 */
export default function Name({ children }) {
  return (
    <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{children}</div>
  );
}
