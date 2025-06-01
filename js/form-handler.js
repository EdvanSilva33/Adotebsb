// Função para lidar com o envio do formulário de adoção
function handleAdoptionForm() {
    const form = document.getElementById('adoption-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const requiredFields = [
            'nome_completo', 'email', 'telefone', 
            'endereco_rua', 'endereco_numero', 'endereco_bairro', 
            'endereco_cidade', 'endereco_estado', 'endereco_cep', 
            'tipo_moradia', 'porque_adotar'
        ];
        
        let isValid = true;
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!input || !input.value.trim()) {
                isValid = false;
                // Destacar campo inválido
                if (input) {
                    input.classList.add('invalid');
                    input.addEventListener('input', function() {
                        this.classList.remove('invalid');
                    });
                }
            }
        });
        
        if (isValid) {
            // Em produção, aqui você usaria um serviço como Formspree, Netlify Forms, etc.
            // Para este exemplo, vamos simular o envio
            
            // Coletar dados do formulário
            const formData = new FormData(form);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Formulário de adoção enviado:', formValues);
            
            // Mostrar mensagem de sucesso
            const flashContainer = document.querySelector('.flash-messages-form');
            if (flashContainer) {
                flashContainer.style.display = 'block';
                flashContainer.innerHTML = '<div class="alert alert-success">Sua solicitação de adoção foi enviada com sucesso! Entraremos em contato em breve.</div>';
            }
            
            // Redirecionar para a página inicial após 3 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            // Mostrar mensagem de erro
            const flashContainer = document.querySelector('.flash-messages-form');
            if (flashContainer) {
                flashContainer.style.display = 'block';
                flashContainer.innerHTML = '<div class="alert alert-danger">Por favor, preencha todos os campos obrigatórios do formulário de adoção.</div>';
            }
        }
    });
}

// Função para lidar com o formulário de newsletter
function handleNewsletterForm() {
    const form = document.querySelector('.newsletter form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[name="email"]').value;
        
        if (email && email.includes('@')) {
            // Em produção, aqui você usaria um serviço como Mailchimp, ConvertKit, etc.
            // Para este exemplo, vamos simular o envio
            console.log(`Inscrição na newsletter para: ${email}`);
            
            // Mostrar mensagem de sucesso
            showNotification(`Obrigado por se inscrever, ${email}! Um e-mail de confirmação foi enviado.`, 'success');
            
            // Limpar o formulário
            this.reset();
        } else {
            showNotification('Por favor, forneça um e-mail válido para a newsletter.', 'warning');
        }
    });
}

// Função para processar parâmetros de URL na busca
function processSearchParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    
    if (queryParam) {
        const searchResults = searchAnimals(queryParam);
        displaySearchResults(queryParam, searchResults);
    }
}

// Inicializar todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    handleAdoptionForm();
    handleNewsletterForm();
    processSearchParams();
    
    // Atualizar o ano atual em todos os rodapés
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});
