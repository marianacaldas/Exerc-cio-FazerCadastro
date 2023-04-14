// 1 - Selecionar o data atribute que abrange o botão
const botaoIniciarCamera = document.querySelector('[data-video-botao]');
// 2 - Selecionar o data atribute que abrange a câmera
const campoCamera = document.querySelector('[data-camera]');
// 3 - Selecionar o data atribute que abrange o vídeo
const video = document.querySelector('[data-video]');
// 5 - Selecionar o data atribute que abrange tirar foto
const botaoTirarFoto = document.querySelector('[data-tirar-foto]');
// 6 - Selecionar o data atribute que abrange o canvas
const canvas = document.querySelector('[data-video-canvas]');
// 7 - Selecionar o data atribute que abrange a mensagem
const mensagem = document.querySelector('[data-mensagem]');
// 12 - Selecionar o data atribute que abrange o botão de enviar a foto capturada
const botaoEnviarFoto = document.querySelector('[data-enviar]');

// 8 - A imagem será inicializada com um valor vazio
let imagemURL = '';

// 4 - Adicionou o evento para iniciar câmera clicando no botão
botaoIniciarCamera.addEventListener('click', async function () {
  const iniciarVideo = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  botaoIniciarCamera.getElementsByClassName.display = 'none';
  campoCamera.getElementsByClassName.display = 'block';

  video.srcObject = iniciarVideo;
});

// 9 - Adicionou um botão tirar foto junto com o evento do click e a função do canvas
botaoTirarFoto.addEventListener('click', function () {
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  imagemURL = canvas.toDataURL('image/jpeg');
  // 10 - Adicionou um campoCamera para que este campo desapareça assim que a foto for tirada
  campoCamera.style.display = 'none';
  // 11 - Adicionou uma mensagem permitindo dessa forma que o check e a mensagem apareçam na tela.
  mensagem.style.display = 'block';
});

//  13 -  Adicionou um botão enviar foto junto com o evento do click e a função para receber os dados da foto e salvar no localStorage e converter em JSON
botaoEnviarFoto.addEventListener('click', () => {
  const receberDadosExistentes = localStorage.getItem('cadastro');
  const converteRetorno = JSON.parse(receberDadosExistentes);

  converteRetorno.imagem = imagemURL;

  localStorage.setItem('cadastro', JSON.stringify(converteRetorno));
  //14 - Para depois que salvar/enviar a foto, passar para a próxima aba
  window.location.href = '../pages/abrir-conta-form-3.html';
});
