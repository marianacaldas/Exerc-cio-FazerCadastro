// 1 - exportar funções para script
export default function ehUmCPF(campo) {
  const cpf = campo.value.replace(/\.|-/g, '');

  // 5 - condicional para ver se o CPF existe
  if (
    validaNumerosRepetidos(cpf) ||
    validaPrimeiroDigito(cpf) ||
    validaSegundoDigito(cpf)
  ) {
    campo.setCustomValidity('Esse CPF não é válido');
  }
}

// 2 - validando números repetidos
function validaNumerosRepetidos(cpf) {
  const numerosRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  return numerosRepetidos.includes(cpf);
}

// 3 - validando primeiro dígito
function validaPrimeiroDigito(cpf) {
  let soma = 0;
  let multiplicador = 10;

  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }

  // esses valores não mudam independente do dígito (soma * 10) % 11;
  soma = (soma * 10) % 11;

  // esses valores não mudam independente do dígito (soma == 10 || soma == 1)
  if (soma == 10 || soma == 1) {
    soma = 0;
  }

  return soma != cpf[9];
}

// 4 - validando segundo dígito
function validaSegundoDigito(cpf) {
  let soma = 0;
  let multiplicador = 11;

  for (let tamanho = 0; tamanho < 10; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }

  // esses valores não mudam independente do dígito (soma * 10) % 11;
  soma = (soma * 10) % 11;

  // esses valores não mudam independente do dígito (soma == 10 || soma == 1)
  if (soma == 10 || soma == 1) {
    soma = 0;
  }

  return soma != cpf[10];
}
