/**
 * Importação do React + hooks
 */
import React, { useState, useEffect } from 'react';

/**
 * Componentes criados exclusivamente para este projeto
 */
import Spinner from './components/Spinner';
import GradesControl from './components/GradesControl';
import ModalGrade from './components/ModalGrade';

/**
 * Isolei as requisições em apiService
 */
import * as api from './api/apiService';

/**
 * Functional Component com Hooks
 */
export default function App() {
  /**
   * Estado de App.js
   */

  // Todas as notas
  const [allGrades, setAllGrades] = useState([]);

  // Nota selecionada para ser persistida
  const [selectedGrade, setSelectedGrade] = useState({});

  // Indicador de modal visível/invisível
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Effect para obter as notas da API. Foi criada uma
   * função específica para utilizar async/await, conforme
   * recomendação da equipe do React. Uma alternativa seria
   * a utilização de promise (comentada).
   *
   * Forcei 2 segundos para exibir o spinner "Aguarde..."
   */
  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };

    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 2000);
    // });

    getGrades();
  }, []);

  /**
   * Função para lidar com a exclusão da nota.
   * Excluímos a nota no backend fisicamente e
   * no front end logicamente, através da mudança
   * do atributo isDeleted
   */
  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradeToDelete.id
      );

      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }
  };

  /**
   * Função para lidar com a persistência de dados.
   * Selecionamos a nota clicada pelo usuário e
   * abrimos a modal para edição
   */
  const handleModalPersist = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  /**
   * Efetua a persistência dos dados propriamente dita
   */
  const handlePersistData = async (formData) => {
    const { id, newValue } = formData;

    const newGrades = Object.assign([], allGrades);

    const gradeToPersist = newGrades.find((grade) => grade.id === id);
    gradeToPersist.value = newValue;

    /**
     * isDeleted = true indica inserção de nota,
     * caso contrário será feita uma atualização da nota
     *
     * Independente da ação, gradeToPersist se mantém
     * consistente e não é necessária nenhuma outra busca
     * na API
     */
    if (gradeToPersist.isDeleted) {
      gradeToPersist.isDeleted = false;
      await api.insertGrade(gradeToPersist);
    } else {
      await api.updateGrade(gradeToPersist);
    }

    setIsModalOpen(false);
  };

  /**
   * Função para lidar com o fechamento
   * da modal
   */
  const handleClose = () => {
    setIsModalOpen(false);
  };

  /**
   * JSX
   */
  return (
    <div>
      <h1 className="center">Controle de notas</h1>

      {allGrades.length === 0 && <Spinner />}

      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handleModalPersist}
        />
      )}

      {isModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </div>
  );
}
