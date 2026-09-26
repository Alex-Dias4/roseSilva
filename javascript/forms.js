document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-inscricao');

    if (form) {
        form.addEventListener('submit', function(event) {
            // Impede a página de recarregar
            event.preventDefault();

            // 1. Recolher os valores dos campos de texto
            const nome = document.getElementById('nome').value.trim();
            const idade = document.getElementById('idade').value.trim();
            const objetivo = document.getElementById('obj').value.trim();
            const restricoes = document.getElementById('lesao').value.trim();
            const conheceu = document.getElementById('conheceu').value.trim();

            // 2. Recolher os valores dos botões radio
            const horarioSelecionado = document.querySelector('input[name="horario"]:checked');
            const horario = horarioSelecionado ? horarioSelecionado.value : 'Não informado';

            const expSelecionada = document.querySelector('input[name="exp"]:checked');
            const experiencia = expSelecionada ? expSelecionada.value : 'Não informado';

            // 3. Estruturar a mensagem
            // Os asteriscos (*) são usados pelo WhatsApp para colocar o texto a negrito
            const mensagem = `Olá! Gostaria de iniciar a minha transformação. Aqui estão os meus dados de inscrição:\n\n` +
                             `*Nome:* ${nome}\n` +
                             `*Idade:* ${idade || 'Não informada'}\n` +
                             `*Objetivo:* ${objetivo || 'Não informado'}\n` +
                             `*Restrições/Lesões:* ${restricoes || 'Nenhuma'}\n` +
                             `*Horário de preferência:* ${horario}\n` +
                             `*Experiência:* ${experiencia}\n` +
                             `*Como conheceu:* ${conheceu || 'Não informado'}`;

            // 4. Configurar o número e o redirecionamento
            // Substitua AQUI pelo número da academia (Código do País + DDD + Número)
            // Exemplo: 55 (Brasil) 11 (DDD) 999999999 (Número) -> "5511999999999"
            const numeroWhatsApp = "5511999999999"; 

            // Codificar a mensagem para formato URL (substitui espaços por %20, etc.)
            const urlEncoded = encodeURIComponent(mensagem);
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${urlEncoded}`;

            // 5. Redirecionar o utilizador numa nova janela/separador
            window.open(urlWhatsApp, '_blank');
        });
    }
});