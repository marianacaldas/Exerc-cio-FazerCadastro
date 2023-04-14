// 1 - Importar arquivos js
import ehUmCPF from './valida-cpf.js';
import ehMaiorDeIdade from './valida-idade.js';
// 2 - Selecionar todos os elementos obrigatórios do formulário
const camposDoFormulario = document.querySelectorAll('[required]');
// 14 - Selecionar o data atribute: data-formulario
const formulario = document.querySelector('[data-formulario]');

// 15 - criar um evento e preveni-lo
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  // 16 - lista de respostas para cada um
  const listaRespostas = {
    nome: e.target.elements['nome'].value,
    email: e.target.elements['email'].value,
    rg: e.target.elements['rg'].value,
    cpf: e.target.elements['cpf'].value,
    aniversario: e.target.elements['aniversario'].value,
  };
  // 17 - selecionar o armazenamento local (localStorage) e inseriu um item dentro dele que tem a chave 'cadastro' e os itens da lista (usando JSON e deixar salvo)
  localStorage.setItem('cadastro', JSON.stringify(listaRespostas));
  // 18 - para fazer o redirewcionamento para a última parte do formulário
  window.location.href = './abrir-conta-form-2.html';
});

// 3 - Fazer uma verificação para CADA um dos elementos do formulário
camposDoFormulario.forEach((campo) => {
  campo.addEventListener('blur', () => verificaCampo(campo));
  // 6 - evento para tirar mensagem de campo obrigatório no nome
  campo.addEventListener('invalid', (evento) => evento.preventDefault());
});

// 7 - Colocar em uma variável os tipos de erros mais comuns
const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'customError',
];

// 8 - Colocar mensagens customizadas para cada tipo de erro
const mensagens = {
  nome: {
    valueMissing: 'O campo de nome não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um nome válido.',
    tooShort: 'Por favor, preencha um nome válido.',
  },
  email: {
    valueMissing: 'O campo de e-mail não pode estar vazio.',
    typeMismatch: 'Por favor, preencha um email válido.',
    tooShort: 'Por favor, preencha um e-mail válido.',
  },
  rg: {
    valueMissing: 'O campo de RG não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um RG válido.',
    tooShort: 'O campo de RG não tem caractéres suficientes.',
  },
  cpf: {
    valueMissing: 'O campo de CPF não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um CPF válido.',
    customError: 'O CPF digitado não existe.',
    tooShort: 'O campo de CPF não tem caractéres suficientes.',
  },
  aniversario: {
    valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior que 18 anos para se cadastrar.',
  },
  termos: {
    valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
  },
};

function verificaCampo(campo) {
  // 9 - criar uma variável das mensagens
  let mensagem = '';
  // 13 - Com o método setCustomValidity é possível alterar o valor de customError.
  campo.setCustomValidity('');
  // 4 - Função para verificar a valiação dde CPF
  if (campo.name == 'cpf' && campo.value.length >= 11) {
    ehUmCPF(campo);
  }
  // 5 - Função para verificar se é maior de idade
  if (campo.name == 'aniversario' && campo.value != '') {
    ehMaiorDeIdade(campo);
  }
  //10 - Colocar um tipo de erro para CADA erro
  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
      console.log(mensagem);
    }
  });
  // 11 - Selecionar no HTML as classes com mensagem-erro no input desejado
  const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
  // 12 - Checar se está válido ou não
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = '';
  }
}
