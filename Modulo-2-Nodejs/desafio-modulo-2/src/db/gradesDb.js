import fs from 'fs';
const gradesControlPath = './src/db/grades.json';

const { writeFile, readFile } = fs.promises;

const gradesDb = () =>{
  const readGrades = async () => {
    const data = await readFile(gradesControlPath, { encoding: 'utf-8' });
    const gradesControl = JSON.parse(data);
    return gradesControl;
  }
  
  const saveGrades = async (gradesControl) => {
    await writeFile(gradesControlPath, JSON.stringify(gradesControl), { encoding: 'utf-8' });
  }

  return {readGrades,saveGrades};
}

export default gradesDb;