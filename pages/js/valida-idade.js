// 1 - exportar funções para script
export default function ehMaiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value);
  //3 - fazer validação para saber se é maior de idade
  if (!validaIdade(dataNascimento)) {
    campo.setCustomValidity('O usuário não é maior de idade!');
  }
}

// 2 - Validando a Idade para saber se é +18
function validaIdade(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate(),
  );

  return dataAtual >= dataMais18;
}
