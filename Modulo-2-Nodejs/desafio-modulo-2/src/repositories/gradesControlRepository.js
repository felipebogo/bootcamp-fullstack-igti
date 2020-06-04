import gradesDb from '../db/gradesDb.js';

const db = gradesDb();

const gradesControRepository = () => {
  const getGrades = async () => {
    return await db.readGrades();
  };

  const saveGrade = async (grade) => {
    const gradesControl = await getGrades();
    const { student, subject, type, value } = grade
    const newGrade = {
      id: gradesControl.nextId++,
      student,
      subject,
      type,
      value,
      timestamp: new Date()
    }
    gradesControl.grades.push(newGrade);
    await db.saveGrades(gradesControl);
    return newGrade;
  }

  const updateGrade = async (grade) => {
    const gradesControl = await getGrades();
    const indexGrade = gradesControl.grades.findIndex(({ id }) => parseInt(grade.id) === id);
    if (!indexGrade || indexGrade === -1) {
      throw new Error(`Grade with index ${grade.id} not found.`);
    }
    const storagedGrade = gradesControl.grades[indexGrade];
    const { student, subject, type, value } = grade;
    gradesControl.grades[indexGrade] = { ...storagedGrade, student, subject, type, value };
    await db.saveGrades(gradesControl);
  }

  const deleteGrade = async (id) => {
    const gradesControl = await getGrades();
    const newGrades = gradesControl.grades.filter(({ id: gradeId }) => parseInt(id) !== gradeId);
    gradesControl.grades = newGrades;
    await db.saveGrades(gradesControl);
  }

  const getGradeById = async (id) => {
    const gradesControl = await getGrades();
    const grade = gradesControl.grades.find(({ id: gradeId }) => parseInt(id) === gradeId);
    return grade;
  }

  const getStudentBySubject = async ({ student, subject }) => {
    const gradesControl = await getGrades();
    return gradesControl.grades
      .filter(({ student: dbStudent, subject: dbSubject }) => dbStudent === student && dbSubject === subject);
  }

  const getTotalStudentBySubject = async ({ student, subject }) => {
    const grades = await getStudentBySubject({ student, subject })
    return grades.reduce((acumm, curVal) => acumm += curVal.value, 0);
  }

  const getGradesBySubjectType = async ({ type, subject }) => {
    const gradesControl = await getGrades();
    return gradesControl.grades
      .filter(({ type: dbType, subject: dbSubject }) => dbType === type && dbSubject === subject);
  }

  const getAverageBySubjectType = async ({ type, subject }) => {
    const grades = await getGradesBySubjectType({ type, subject })
    const total = grades.reduce((acumm, curVal) => acumm += curVal.value, 0);
    return total / grades.length;
  }

  const getBestGradesBySubjectType = async ({ type, subject }) => {
    const grades = await getGradesBySubjectType({ type, subject })
    const bestGrades = grades.sort((prev, curr) => curr.value - prev.value);
    return bestGrades;
  }

  return {
    getGrades,
    saveGrade,
    updateGrade,
    deleteGrade,
    getGradeById,
    getStudentBySubject,
    getTotalStudentBySubject,
    getGradesBySubjectType,
    getAverageBySubjectType,
    getBestGradesBySubjectType
  };

}

export default gradesControRepository;