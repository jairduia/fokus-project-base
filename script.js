/* HTML */
const html = document.querySelector('html');

const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const musicFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector('#timer');

/* Botons */
const botons = document.querySelectorAll('.app__card-button');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');

/* Audios */
const music = new Audio('./sons/luna-rise-part-one.mp3');
const iniciar = new Audio('./sons/play.wav');
const parar = new Audio('./sons/pause.mp3');
const final = new Audio('./sons/beep.mp3');

/* Icons */
const icon = document.querySelector('.app__card-primary-butto-icon');

/* Variables */
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

/* Timers */
let timerFoco = 2100;
let timerCurto = 300;
let timerLongo = 900;

music.loop = true;

musicFocoInput.addEventListener('change', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timerFoco
    changeContext('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timerCurto
    changeContext('descanso-curto');
    curtoBt.classList.add('active');
}); 

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timerLongo
    changeContext('descanso-longo');
    longoBt.classList.add('active');
}); 


function changeContext(contexto) {
    mostrarTempo(contexto);
    botons.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break; 
        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;    
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        final.play();
        alert('Tempo finalizado!');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar)


function iniciarOuPausar() {
    if (intervaloId) {
        parar.play()
        zerar();
        return        
    }
    iniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    icon.setAttribute('src', './imagens/pause.png');
    iniciarOuPausarBt.textContent = "Pausar";
}


function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    icon.setAttribute('src', './imagens/play_arrow.png');
    iniciarOuPausarBt.textContent = "Começar";
}


function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();