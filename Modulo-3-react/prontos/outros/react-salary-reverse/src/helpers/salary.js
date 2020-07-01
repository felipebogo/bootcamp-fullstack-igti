/**
 * Fonte: https://www.dicionariofinanceiro.com/calculadora-de-salario-liquido/
 */
function calculateSalaryFrom(fullSalary) {
  const baseINSS = fullSalary;

  let discountINSS =
    baseINSS <= 1045
      ? baseINSS * 0.075
      : baseINSS <= 2089.6
      ? baseINSS * 0.09
      : baseINSS <= 3134.4
      ? baseINSS * 0.12
      : baseINSS <= 6101.06
      ? baseINSS * 0.14
      : 713.1; // Teto

  discountINSS = +discountINSS.toFixed(2);

  const baseIRPF = baseINSS - discountINSS;

  let discountIRPF =
    baseIRPF <= 1903.98
      ? 0
      : baseIRPF <= 2826.65
      ? baseIRPF * 0.075 - 142.8
      : baseIRPF <= 3751.05
      ? baseIRPF * 0.15 - 354.8
      : baseIRPF <= 4664.68
      ? baseIRPF * 0.225 - 636.13
      : baseIRPF * 0.275 - 869.36;

  discountIRPF = +discountIRPF.toFixed(2);

  const netSalary = fullSalary - discountINSS - discountIRPF;

  return {
    fullSalary,
    baseINSS,
    discountINSS,
    baseIRPF,
    discountIRPF,
    netSalary,
  };
}

export { calculateSalaryFrom };
