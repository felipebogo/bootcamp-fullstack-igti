/**
 * O axios é uma biblioteca para
 * requisições HTTP bem mais intuitiva
 * e flexível que o comando fetch. Uso
 * bastante para POST, PUT e DELETE
 */
import axios from 'axios';

/**
 * Link da API
 */
const API_URL = 'http://localhost:3001/grade/';

/**
 * Array com regras para
 * cada tipo de avaliação
 */
const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercícios',
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático',
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: 'Desafio',
    minValue: 0,
    maxValue: 50,
  },
];

/**
 * Função para obtenção de todas as notas
 * a partir do back end. Além disso, insiro
 * as notas que foram excluídas do back end
 * como uma "exclusão lógica", com o atributo
 * isDeleted = true
 */
async function getAllGrades() {
  const res = await axios.get(API_URL);

  const grades = res.data.grades.map((grade) => {
    const { student, subject, type } = grade;

    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    };
  });

  /**
   * Obtenho todos os alunos de
   * forma distinta através de Set()
   */
  let allStudents = new Set();
  grades.forEach((grade) => allStudents.add(grade.student));
  allStudents = Array.from(allStudents);

  /**
   * Obtenho todos as disciplinas de
   * forma distinta através de Set()
   */

  let allSubjects = new Set();
  grades.forEach((grade) => allSubjects.add(grade.subject));
  allSubjects = Array.from(allSubjects);

  /**
   * Obtenho todos os tipos de avaliação de
   * forma distinta através de Set()
   */

  let allGradeTypes = new Set();
  grades.forEach((grade) => allGradeTypes.add(grade.type));
  allGradeTypes = Array.from(allGradeTypes);

  /**
   * Montando todas as combinações
   * possíveis de aluno, disciplina
   * e tipo de avaliação
   */
  const allCombinations = [];
  allStudents.forEach((student) => {
    allSubjects.forEach((subject) => {
      allGradeTypes.forEach((type) => {
        allCombinations.push({
          student,
          subject,
          type,
        });
      });
    });
  });

  /**
   * Obtendo próximo id
   * a partir do valor máximo
   * dos id's já existentes
   */
  let maxId = -1;
  grades.forEach(({ id }) => {
    if (id > maxId) {
      maxId = id;
    }
  });
  let nextId = maxId + 1;

  /**
   * Para cada combinação, verifico
   * se a mesma já existe nas notas
   * vindas do back end. Caso não exista,
   * significa que a nota foi excluída no
   * back end. Assim, crio um registro com
   * isDeleted = true e insiro em grades para
   * enviar ao Front End
   */
  allCombinations.forEach(({ student, subject, type }) => {
    const hasItem = grades.find((grade) => {
      return (
        grade.subject === subject &&
        grade.student === student &&
        grade.type === type
      );
    });

    if (!hasItem) {
      grades.push({
        id: nextId++,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true,
      });
    }
  });

  /**
   * Ordenação:
   *
   * 1) Nome do aluno
   * 2) Disciplina
   * 3) Tipo de avaliação
   *
   * Para isso, devemos executar o sort inversamente à
   * ordem acima
   */
  grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
  grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

  return grades;
}

/**
 * Inserção no back end
 */
async function insertGrade(grade) {
  const response = await axios.post(API_URL, grade);
  return response.data.id;
}

/**
 * Atualização no back end
 */
async function updateGrade(grade) {
  const response = await axios.put(API_URL, grade);
  return response.data;
}

/**
 * Exclusão no back end
 */
async function deleteGrade(grade) {
  const response = await axios.delete(`${API_URL}/${grade.id}`);
  return response.data;
}

/**
 * Obtendo validação a partir do tipo
 */
async function getValidationFromGradeType(gradeType) {
  const gradeValidation = GRADE_VALIDATION.find(
    (item) => item.gradeType === gradeType
  );

  const { minValue, maxValue } = gradeValidation;

  return {
    minValue,
    maxValue,
  };
}

/**
 * Tornando todas as funções
 * abaixo disponíveis para
 * serem utilizadas por outros
 * arquivos
 */
export {
  getAllGrades,
  insertGrade,
  updateGrade,
  deleteGrade,
  getValidationFromGradeType,
};
