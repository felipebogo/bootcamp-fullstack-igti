import React, { useState, useEffect } from 'react';

/**
 * Utilização de 'react-modal'
 */
import Modal from 'react-modal';

import * as api from '../api/apiService';

/**
 * Exigido pelo componente Modal
 */
Modal.setAppElement('#root');

/**
 * Componente ModalGrade
 */
export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  /**
   * Desestruturando selectedGrade
   */
  const { id, student, subject, type, value } = selectedGrade;

  // Valor da nota
  const [gradeValue, setGradeValue] = useState(value);

  // Objeto de validação da nota
  const [gradeValidation, setGradeValidation] = useState({});

  // Mensagem de erro
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Efeito para obter a validação da API, monitorando
   * type
   */
  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };

    getValidation();
  }, [type]);

  /**
   * Efeito para verificar se a nota informada
   * pelo usuário é válida, monitorando gradeValue
   * e gradeValidation
   */
  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }

    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  /**
   * Evento para monitorar a tecla Esc, através de keydown
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Eliminando evento
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  /**
   * Cercando a tecla "Esc"
   * e fechando a modal caso
   * seja digitada
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  /**
   * Função para lidar com o envio
   * de dados do formulário. Devemos
   * prevenir o envio e tratar manualmente
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id,
      newValue: gradeValue,
    };

    onSave(formData);
  };

  /**
   * Lidando com o fechamento da modal
   */
  const handleModalClose = () => {
    onClose(null);
  };

  /**
   * Lidando com a mudança da nota
   * no input
   */
  const handleGradeChange = (event) => {
    setGradeValue(+event.target.value);
  };

  /**
   * JSX
   */
  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de notas</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputName" type="text" value={student} readOnly />
            <label className="active" htmlFor="inputName">
              Nome do aluno:
            </label>
          </div>

          <div className="input-field">
            <input id="inputSubject" type="text" value={subject} readOnly />
            <label className="active" htmlFor="inputSubject">
              Disciplina:
            </label>
          </div>

          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly />
            <label className="active" htmlFor="inputType">
              Tipo de avaliação:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Nota:
            </label>
          </div>

          <div style={styles.flexRow}>
            <button
              className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ''}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};
