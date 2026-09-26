const faqs = document.querySelectorAll('section#duvidas .faq ');

faqs.forEach((faq) => {
  faq.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active');
  });
});