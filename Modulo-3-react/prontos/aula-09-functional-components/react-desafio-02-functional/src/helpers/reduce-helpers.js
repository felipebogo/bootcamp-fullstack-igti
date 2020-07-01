function getTotalPopulation(countries) {
  return countries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);
}

export { getTotalPopulation };
