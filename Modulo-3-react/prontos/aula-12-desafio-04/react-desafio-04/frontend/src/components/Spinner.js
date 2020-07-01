import React from 'react';

/**
 * Componente para exibir um spinner
 * em tela. Útil para indicar ao usuário
 * que algo está sendo processado
 */
export default function Spinner({ description = 'Aguarde...' }) {
  return (
    <div style={styles.flexRow}>
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>

      <span style={{ marginLeft: '10px', fontSize: '1.2rem' }}>
        {description}
      </span>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
