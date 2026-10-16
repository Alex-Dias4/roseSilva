document.addEventListener("DOMContentLoaded", () => {
    const cardsData = [
        {
            selector: ".funcionaria.one",
            className: "one",
            titulo: "Corrida das Musas",
            subfuncao: "Mais do que quilômetros percorridos",
            descricaoCompleta: "É sobre superação, saúde, amizade e amor-próprio. Cada passo dado hoje representa dedicação, coragem e a escolha de cuidar de si mesma. Essa corrida reúniu centenas de mulheres para celebrar conquistas.",
            url: "https://seusite.com/corrida",
            textoBotao: "Inscreva-se na Corrida"
        },
        {
            selector: ".funcionaria.two",
            className: "two",
            titulo: "Dança Step",
            subfuncao: "Um espaço pensado para respeitar seu ritmo, seu corpo e seus objetivos.",
            descricaoCompleta: "Com turmas reduzidas e acompanhamento de perto, cada treino recebe a atenção que você precisa para evoluir com segurança e confiança, respeitando seus limites.",
            url: null,
            textoBotao: null
        },
        {
            selector: ".funcionaria.three",
            className: "three",
            titulo: "Prêmio ANDEPE",
            subfuncao: "Destaque como Academia feminina da Bahia",
            descricaoCompleta: "Esse reconhecimento é mais do que um troféu é a prova de que valeu a pena cada desafio, cada madrugada de planejamento, cada lágrima e cada vez que não desistir mesmo diante de tantos desafios.",
            url: "https://seusite.com/premio",
            textoBotao: "Saiba mais sobre o prêmio"
        },
        {
            selector: ".funcionaria.for",
            className: "for",
            titulo: "CONSULTORIA ONLINE",
            subfuncao: "Treino personalizado + Cardápio alimentar + acompanhamento via WhatsApp + correção por vídeos",
            descricaoCompleta: "Para quem quer um plano feito de acordo com seu objetivo e sua rotina, com acompanhamento de verdade e suporte direto pelo WhatsApp para garantir resultados expressivos.",
            url: "https://wa.me/seunumero",
            textoBotao: "Falar no WhatsApp"
        },
        {
            selector: ".funcionaria.five",
            className: "five",
            titulo: "DESAFIO DAS MUSAS — 30 DIAS",
            subfuncao: "30 dias para você ter Resultado de Verdade.",
            descricaoCompleta: "Uma experiência para você treinar, cuidar da alimentação e se manter motivada junto com uma comunidade de mulheres que têm o mesmo propósito de transformação.",
            url: "https://seusite.com/desafio",
            textoBotao: "Quero Participar do Desafio"
        }
    ];

    // Cria a estrutura HTML incluindo um wrapper para os textos internos
    const modalHTML = `
        <div id="modal-dinamico" class="modal-overlay">
            <div class="modal-box" id="modal-box-container">
                <span class="modal-close">&times;</span>
                <div class="conteudo-interno">
                    <h3 id="modal-m-titulo"></h3>
                    <span class="funcao" id="modal-m-sub"></span>
                    <p id="modal-m-texto"></p>
                    <div id="modal-m-btn-container"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('modal-dinamico');
    const modalBoxContainer = document.getElementById('modal-box-container');
    const spanClose = modal.querySelector('.modal-close');
    const mTitulo = document.getElementById('modal-m-titulo');
    const mSub = document.getElementById('modal-m-sub');
    const mTexto = document.getElementById('modal-m-texto');
    const mBtnContainer = document.getElementById('modal-m-btn-container');

    let cardClicadoAtual = null;

    function abrirModal(item, elementoCard) {
        cardClicadoAtual = elementoCard;
        
        // 1. Pega a posição exata do minicard na tela
        const rect = elementoCard.getBoundingClientRect();

        // 2. Posiciona o modal instantaneamente sobre o minicard (sem transição)
        modalBoxContainer.style.transition = 'none';
        modalBoxContainer.style.top = rect.top + 'px';
        modalBoxContainer.style.left = rect.left + 'px';
        modalBoxContainer.style.width = rect.width + 'px';
        modalBoxContainer.style.height = rect.height + 'px';

        // Preenche os dados
        modalBoxContainer.className = "modal-box " + item.className;
        mTitulo.textContent = item.titulo;
        mSub.textContent = item.subfuncao;
        mTexto.textContent = item.descricaoCompleta;

        mBtnContainer.innerHTML = '';
        if (item.url && item.textoBotao) {
            const btn = document.createElement('a');
            btn.href = item.url;
            btn.textContent = item.textoBotao;
            btn.target = "_blank";
            btn.className = "modal-action-btn";
            mBtnContainer.appendChild(btn);
        }

        // Mostra o fundo escuro
        modal.classList.add('ativo');

        // 3. Força o navegador a aplicar o tamanho inicial e depois anima para o centro
        setTimeout(() => {
            modalBoxContainer.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            modalBoxContainer.style.top = '50%';
            modalBoxContainer.style.left = '50%';
            modalBoxContainer.style.width = '90%';
            modalBoxContainer.style.maxWidth = '700px';
            modalBoxContainer.style.height = 'auto';
            modalBoxContainer.style.minHeight = '400px';
            modalBoxContainer.style.transform = 'translate(-50%, -50%)';
        }, 10);
    }

    function fecharModal() {
        if (!cardClicadoAtual) {
            modal.classList.remove('ativo');
            return;
        }

        // Pega de volta a posição do card de origem para o modal encolher de volta para lá
        const rect = cardClicadoAtual.getBoundingClientRect();

        modalBoxContainer.style.top = rect.top + 'px';
        modalBoxContainer.style.left = rect.left + 'px';
        modalBoxContainer.style.width = rect.width + 'px';
        modalBoxContainer.style.height = rect.height + 'px';
        modalBoxContainer.style.minHeight = rect.height + 'px';
        modalBoxContainer.style.transform = 'none';

        // Esconde o fundo e os textos
        modal.classList.remove('ativo');

        // Reseta os estilos após a animação de fechamento terminar
        setTimeout(() => {
            modalBoxContainer.style.transition = 'none';
        }, 500);
    }

    // Atribui o evento de clique aos cards
    cardsData.forEach(item => {
        const elementoCard = document.querySelector(item.selector);
        if (elementoCard) {
            elementoCard.style.cursor = 'pointer';
            elementoCard.addEventListener('click', () => abrirModal(item, elementoCard));
        }
    });

    spanClose.addEventListener('click', fecharModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
});