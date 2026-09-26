const headerElement = document.querySelector('.header'); // Seleciona a div flutuante .header
const secaoBranca = document.querySelector('.bg-branco');

const observerOptions = {
  root: null,
  // Executa a checagem exatamente quando o elemento entra na linha do header
  rootMargin: "-80px 0px 0px 0px", 
  threshold: 0
};

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Só aplica o texto preto se a seção branca REALMENTE estiver cruzando o topo
    if (entry.isIntersecting) {
      headerElement.classList.add('header-escuro');
    } else {
      headerElement.classList.remove('header-escuro');
    }
  });
}, observerOptions);

// Ativa o monitoramento na seção branca
if (secaoBranca) {
  headerObserver.observe(secaoBranca);
}
