// Lista de imagens - Fácil de alterar no futuro
const listaDeImagens = [
    "./img/carossel/image1.png", 
    "./img/carossel/image2.png", 
    "./img/carossel/image3.png", 
    "./img/carossel/image4.png", 
    "./img/carossel/image5.png", 
    "./img/carossel/image6.png",
    "./img/carossel/image7.png", 
    "./img/carossel/image8.png", 
    "./img/carossel/image9.png"
];

let indiceAtual = 0;
const tempoDeTransicao = 3500;
let carrosselInterval;
let transicaoTimeout; // Variável nova para controlar o atraso da troca de imagem

const imgElement = document.querySelector('#musa .alunas .inscicao .after figure img');
const pointsContainer = document.querySelector('.points');

function renderizarCarrossel() {
    // Limpa qualquer transição pendente (evita bugar se clicar muito rápido)
    clearTimeout(transicaoTimeout);

    // 1. Efeito de fade na imagem principal
    imgElement.style.opacity = 0;
    
    transicaoTimeout = setTimeout(() => {
        imgElement.src = listaDeImagens[indiceAtual];
        imgElement.style.opacity = 1;
    }, 150); 

    // 2. Limpar os pontos atuais
    pointsContainer.innerHTML = '';

    // 3. Lógica para exibir no máximo 5 bolinhas
    const maxBolinhas = Math.min(5, listaDeImagens.length);
    let inicio = 0;

    // Calcular a "janela" de bolinhas para manter o selecionado no meio (3ª posição)
    if (listaDeImagens.length > 5) {
        if (indiceAtual >= 2 && indiceAtual < listaDeImagens.length - 2) {
            inicio = indiceAtual - 2; 
        } else if (indiceAtual >= listaDeImagens.length - 2) {
            inicio = listaDeImagens.length - 5; 
        }
    }

    // 4. Gerar os pontos no HTML
    for (let i = 0; i < maxBolinhas; i++) {
        const indexReal = inicio + i;

        const ciclo = document.createElement('div');
        ciclo.classList.add('ciclo');
        
        if (indexReal === indiceAtual) {
            ciclo.classList.add('activate');
        }

        const ponto = document.createElement('div');
        ponto.classList.add('ponto');

        // Lógica da cor escura (#490024)
        const temMaisParaCima = (i === 0 && inicio > 0);
        const temMaisParaBaixo = (i === maxBolinhas - 1 && inicio + maxBolinhas < listaDeImagens.length);

        if (temMaisParaCima || temMaisParaBaixo) {
            ponto.classList.add('out');
        }

        ciclo.appendChild(ponto);

        // Evento de clique na bolinha
        ciclo.addEventListener('click', () => {
            // NOVA TRAVA: Se o usuário clicar na bolinha que já está ativa, o código ignora o clique
            if (indiceAtual === indexReal) return; 

            indiceAtual = indexReal;
            reiniciarIntervalo();
            renderizarCarrossel();
        });

        pointsContainer.appendChild(ciclo);
    }
}

function proximaImagem() {
    indiceAtual = (indiceAtual + 1) % listaDeImagens.length;
    renderizarCarrossel();
}

function iniciarCarrossel() {
    carrosselInterval = setInterval(proximaImagem, tempoDeTransicao);
}

function reiniciarIntervalo() {
    clearInterval(carrosselInterval);
    iniciarCarrossel();
}

// Inicializar
renderizarCarrossel();
iniciarCarrossel();