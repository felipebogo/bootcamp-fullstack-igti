import fs from 'fs';

const statesPath = './src/assets/estados.json';
const citiesPath = './src/assets/cidades.json';
const statesDirPath = './src/assets/states/';
let statesList = [];
let citiesList = [];
let citiesState = {};
let loadedStates = [];

const load = async () => {
  const promiseStates = fs.promises.readFile(statesPath);
  const promiseCities = fs.promises.readFile(citiesPath);
  const ret = await Promise.all([promiseStates, promiseCities]);
  statesList = JSON.parse(ret[0]);
  citiesList = JSON.parse(ret[1]);
};

const loadStates = async () => {
  const statesPromises = statesList.map(state => {
    const prom = fs.promises.readFile(`${statesDirPath}${state.Sigla}.json`);
    return { Sigla: state.Sigla, promise: prom };
  });
  const promises = statesPromises.map(state => state.promise);
  const states = statesPromises.map(state => state.Sigla);
  const ret = await Promise.all(promises);
  ret.forEach((rawState, idx) => {
    const cities = JSON.parse(rawState);
    citiesState[states[idx]] = cities;
  });
};


/* 
1. Implementar um método que irá criar um arquivo JSON para cada estado 
representado no arquivo Estados.json, e o seu conteúdo será um array das cidades
 pertencentes aquele estado, de acordo com o arquivo Cidades.json. O nome do 
 arquivo deve ser o UF do estado, por exemplo: MG.json.
*/
const createStateFiles = async() => {
  const statePromises = statesList.map(({ ID, Sigla }) => {
    loadedStates.push(Sigla);
    const stateCities = citiesList.filter(city => city.Estado === ID).
      map(({ ID, Nome }) => {
        return { ID, Nome }
      });
    return fs.promises.writeFile(`./src/assets/states/${Sigla}.json`, JSON.stringify(stateCities));
  });
  await Promise.all(statePromises);
};

/* 
2. Criar um método que recebe como parâmetro o UF do estado, realize a leitura 
do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
*/
const countStateCities = (stateInitials) => {
  return citiesState[stateInitials].length;
};

const getCitiesCount = () => {
  const citiesCount = loadedStates.map((initials) => {
    return { Sigla: initials, citiesCount: countStateCities(initials) }
  })
  return citiesCount;
};

/* 
3. Criar um método que imprima no console um array com o UF dos cinco estados 
que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize 
o método criado no tópico anterior. Exemplo de impressão: 
[“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
*/

const printStatesWithMoreCities = () => {
  let cities = getCitiesCount().sort((prev, curr) => curr.citiesCount - prev.citiesCount);
  console.log('Estados com mais cidades');
  console.log(cities.slice(0, 5));
};

/* 
4. Criar um método que imprima no console um array com o UF dos cinco estados 
que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o
 método criado no tópico anterior. Exemplo de impressão: 
 [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”] 
 */
const printStatesWithLessCities = () => {
  let cities = getCitiesCount().sort((prev, curr) => curr.citiesCount - prev.citiesCount);
  console.log('Estados com menos cidades');
  console.log(cities.slice(22));
};

/* 
5. Criar um método que imprima no console um array com a cidade de maior nome de
 cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética 
 para ordená-los e então retornar o primeiro. Por exemplo: 
 [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].

*/
const getGreatestCitiesNames = () => {
  const greatestsCities = loadedStates.map((stateInitials) => {
    const cities = citiesState[stateInitials];
    const sortedCities = cities.sort((prev, curr) => {
      const size = curr.Nome.length - prev.Nome.length;
      if (size === 0) {
        return prev.Nome.localeCompare(curr.Nome);
      }
      return size;
    });
    return { Estado: stateInitials, maiorCidade: sortedCities[0].Nome }
  });
  return (greatestsCities);
};

const printGreatestCitiesNames = () => {
  console.log('Cidade com maior nome por estado:');
  console.log(getGreatestCitiesNames());
}

/* 

6. Criar um método que imprima no console um array com a cidade de menor nome de 
cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética
 para ordená-los e então retorne o primeiro. Por exemplo: 
 [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].

*/

const getSmallestCitiesNames = () => {
  const smallestCities = loadedStates.map((stateInitials) => {
    const cities = citiesState[stateInitials];
    const sortedCities = cities.sort((prev, curr) => {
      const size = prev.Nome.length - curr.Nome.length;
      if (size === 0) {
        return prev.Nome.localeCompare(curr.Nome);
      }
      return size;
    });
    return { Estado: stateInitials, menorCidade: sortedCities[0].Nome }
  });
  return smallestCities;
};


const  printSmallestCitiesNames = ()=>{
  console.log('Cidade com menor nome por estado:');
  console.log(getSmallestCitiesNames());
};

/* 

7. Criar um método que imprima no console a cidade de maior nome entre todos os
 estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética
  para ordená-los e então retornar o primeiro. Exemplo: “Nome da Cidade - UF".

*/

const printGreatestCity = () => {
  const greatestsCities = getGreatestCitiesNames().sort((prev, curr) => {
    const size = curr.maiorCidade.length - prev.maiorCidade.length;
    if (size === 0) {
      return prev.maiorCidade.localeCompare(curr.maiorCidade);
    }
    return size;
  });
  console.log('Cidade com maior nome:');
  console.log(greatestsCities[0]);
};

/* 

8. Criar um método que imprima no console a cidade de menor nome entre todos os 
estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética
 para ordená-los e então retornar o primeiro. Exemplo: “Nome da Cidade - UF".

*/

const printSmallestCity = () => {
  const smallestCities = getSmallestCitiesNames().sort((prev, curr) => {
    const size = prev.menorCidade.length - curr.menorCidade.length;
    if (size === 0) {
      return prev.menorCidade.localeCompare(curr.menorCidade);
    }
    return size;
  });
  console.log('Cidade com menor nome:');
  console.log(smallestCities[0]);
};


const runApp = async () => {
  await load();
  await createStateFiles();
  await loadStates();
  printStatesWithMoreCities();
  printStatesWithLessCities();
  printGreatestCitiesNames();
  printSmallestCitiesNames();
  printGreatestCity();
  printSmallestCity();
}

runApp();

