document.addEventListener('DOMContentLoaded', () => {
    
    const depoimentos = [
        { id: 1, nome: "Ana Silva", foto: "./img/cardRoseStudio.png", comentario: "Mudou completamente minha visão sobre treino. Hoje me sinto muito mais forte e disposta para o dia a dia!", avaliacao: 5 },
        { id: 2, nome: "Carla Mendes", foto: "./img/cardRoseStudio.png", comentario: "Nunca achei que conseguiria ter consistência, mas o ambiente e o suporte fazem toda a diferença.", avaliacao: 5 },
        { id: 3, nome: "Juliana Costa", foto: "./img/cardRoseStudio.png", comentario: "Resultados visíveis em poucas semanas. A melhor escolha que fiz por mim mesma neste ano.", avaliacao: 4 },
        { id: 4, nome: "Beatriz Lima", foto: "./img/cardRoseStudio.png", comentario: "Treinos dinâmicos e adaptados para o meu limite. A autoestima está lá em cima!", avaliacao: 5 },
        { id: 5, nome: "Fernanda Souza", foto: "./img/cardRoseStudio.png", comentario: "Mais do que estética, ganhei saúde mental. Recomendo de olhos fechados.", avaliacao: 5 },
        { id: 6, nome: "Mariana Rocha", foto: "./img/cardRoseStudio.png", comentario: "Profissionais incríveis, sempre corrigindo a postura e incentivando.", avaliacao: 4 },
        { id: 7, nome: "Paula Martins", foto: "./img/cardRoseStudio.png", comentario: "O melhor investimento da minha vida. Me sinto uma nova mulher.", avaliacao: 5 }
    ];

    let indiceAtual = 0;
    const cardsVisiveis = 2; 
    const indexMaximo = Math.max(0, depoimentos.length - cardsVisiveis);

    // Variáveis para o temporizador automático
    let carrosselInterval;
    const tempoDeTransicao = 4000; // 4000ms = 4 segundos (ajuste conforme desejar)

    const container = document.getElementById('comentarios-container');
    const pointsContainer = document.getElementById('points-comentarios');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    function renderizarEstrelas(nota) {
        return '★'.repeat(nota) + '☆'.repeat(5 - nota);
    }

    function inicializarCarrossel() {
        if (!container) return; 
        
        container.innerHTML = '';
        
        depoimentos.forEach(item => {
            const cardHTML = `
                <div class="comentario">
                    <div class="topComentario">
                        <div class="profile">
                            <img src="${item.foto}" alt="foto de ${item.nome}">
                            <span>${item.nome}</span>
                        </div>
                        <div class="stars">${renderizarEstrelas(item.avaliacao)}</div>
                    </div>
                    <textarea name="comentario" disabled>${item.comentario}</textarea>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHTML);
        });

        atualizarCarrossel();
    }

    function atualizarCarrossel() {
        const cards = container.querySelectorAll('.comentario');
        
        cards.forEach(card => {
            card.style.transform = `translateX(calc(-${indiceAtual} * (100% + 3vw)))`;
        });

        if (!pointsContainer) return;
        pointsContainer.innerHTML = '';
        
        const totalPaginas = indexMaximo + 1;
        const maxBolinhas = Math.min(5, totalPaginas);
        let inicio = 0;

        if (totalPaginas > 5) {
            if (indiceAtual >= 2 && indiceAtual < totalPaginas - 2) {
                inicio = indiceAtual - 2;
            } else if (indiceAtual >= totalPaginas - 2) {
                inicio = totalPaginas - 5;
            }
        }

        for (let i = 0; i < maxBolinhas; i++) {
            const indexReal = inicio + i;
            const ciclo = document.createElement('div');
            ciclo.className = `ciclo ${indexReal === indiceAtual ? 'activate' : ''}`;
            
            const ponto = document.createElement('div');
            ponto.className = 'ponto';

            const temMaisParaEsquerda = (i === 0 && inicio > 0);
            const temMaisParaDireita = (i === maxBolinhas - 1 && inicio + maxBolinhas < totalPaginas);

            if (temMaisParaEsquerda || temMaisParaDireita) {
                ponto.classList.add('out');
            }

            ciclo.appendChild(ponto);

            ciclo.addEventListener('click', () => {
                indiceAtual = indexReal;
                atualizarCarrossel();
                reiniciarIntervalo(); // Reinicia o tempo ao clicar
            });

            pointsContainer.appendChild(ciclo);
        }
    }

    // --- FUNÇÕES DE AVANÇO AUTOMÁTICO ---
    function proximoCard() {
        indiceAtual = (indiceAtual < indexMaximo) ? indiceAtual + 1 : 0;
        atualizarCarrossel();
    }

    function iniciarCarrosselAuto() {
        carrosselInterval = setInterval(proximoCard, tempoDeTransicao);
    }

    function reiniciarIntervalo() {
        clearInterval(carrosselInterval);
        iniciarCarrosselAuto();
    }
    // ------------------------------------

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            proximoCard();
            reiniciarIntervalo(); // Reinicia o tempo ao clicar
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            indiceAtual = (indiceAtual > 0) ? indiceAtual - 1 : indexMaximo;
            atualizarCarrossel();
            reiniciarIntervalo(); // Reinicia o tempo ao clicar
        });
    }

    window.addEventListener('resize', atualizarCarrossel);

    inicializarCarrossel();
    iniciarCarrosselAuto(); // Dá o play assim que renderiza
});