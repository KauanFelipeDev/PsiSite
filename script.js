// Carrossel de imagens
document.addEventListener('DOMContentLoaded', function() {
    // Carrossel
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Configurar o carrossel inicialmente
    updateCarousel();
    
    // Botões de navegação
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // Atualizar a posição do carrossel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Auto-rotação do carrossel
    let interval = setInterval(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
    
    // Parar auto-rotação quando o mouse estiver sobre o carrossel
    carousel.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    
    // Retomar auto-rotação quando o mouse sair do carrossel
    carousel.addEventListener('mouseleave', function() {
        interval = setInterval(function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    });
    
    // Accordion para FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Fechar todos os outros itens
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-header i').classList.remove('fa-minus');
                    otherItem.querySelector('.accordion-header i').classList.add('fa-plus');
                }
            });
            
            // Alternar o estado do item atual
            item.classList.toggle('active');
            
            // Alternar o ícone
            const icon = this.querySelector('i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Validação do formulário de contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            // Envio para Formspree
            fetch('https://formspree.io/f/xanokvjw', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
                    contactForm.reset();
                } else {
                    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
                }
            })
            .catch(() => {
                alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
            });
        });
    }
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
