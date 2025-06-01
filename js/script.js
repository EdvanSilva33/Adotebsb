// Sistema de notificações
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    
    // Verificar se o container de notificações existe, senão criar
    let notificationContainer = document.querySelector('.flash-messages');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'container flash-messages';
        const mainElement = document.querySelector('main');
        mainElement.insertBefore(notificationContainer, mainElement.firstChild);
    }
    
    // Adicionar notificação ao container
    notificationContainer.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
            // Remover container se estiver vazio
            if (notificationContainer.children.length === 0) {
                notificationContainer.remove();
            }
        }, 300);
    }, 5000);
}

// Função de busca
function searchAnimals(query) {
    if (!query) return [];
    
    query = query.toLowerCase();
    return animaisDB.filter(animal => 
        animal.nome.toLowerCase().includes(query) || 
        animal.especie.toLowerCase().includes(query) || 
        animal.raca.toLowerCase().includes(query) || 
        animal.descricao.toLowerCase().includes(query)
    );
}

// Manipulação de formulários
document.addEventListener('DOMContentLoaded', function() {
    // Formulário de busca
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input[name="query"]').value;
            
            if (query) {
                // Redirecionar para a página inicial com parâmetro de busca
                window.location.href = `index.html?query=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[name="email"]').value;
            
            if (email) {
                // Simular envio (em produção, usar serviço real)
                console.log(`Simulando inscrição na newsletter para: ${email}`);
                showNotification(`Obrigado por se inscrever, ${email}! Um e-mail de confirmação foi enviado (simulado).`, 'success');
                this.reset();
            } else {
                showNotification('Por favor, forneça um e-mail válido para a newsletter.', 'warning');
            }
        });
    }
    
    // Formulário de adoção
    const adoptionForm = document.querySelector('.adoption-form');
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', function(e) {
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
                }
            });
            
            if (isValid) {
                // Simular envio (em produção, usar serviço real)
                const formData = new FormData(this);
                const formValues = {};
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                console.log('Formulário de adoção enviado:', formValues);
                showNotification('Sua solicitação de adoção foi enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                // Redirecionar para a página inicial após 2 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showNotification('Por favor, preencha todos os campos obrigatórios do formulário de adoção.', 'danger');
            }
        });
    }
    
    // Processar parâmetros de URL para busca
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    
    if (queryParam) {
        const searchResults = searchAnimals(queryParam);
        displaySearchResults(queryParam, searchResults);
    }
});

// Função para exibir resultados da busca
function displaySearchResults(query, results) {
    // Verificar se estamos na página inicial
    const mainElement = document.querySelector('main');
    if (!mainElement) return;
    
    // Criar seção de resultados
    const searchSection = document.createElement('section');
    searchSection.id = 'search-results-section';
    searchSection.className = 'gallery-section';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    if (results.length > 0) {
        // Mostrar notificação
        showNotification(`${results.length} resultado(s) encontrado(s) para '${query}'.`, 'info');
        
        // Adicionar título
        const title = document.createElement('h2');
        title.textContent = `Resultados da Busca por "${query}"`;
        container.appendChild(title);
        
        // Criar grid para resultados
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        
        // Adicionar cada animal encontrado
        results.forEach(animal => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            item.innerHTML = `
                <img src="${animal.imagem}" alt="${animal.nome}">
                <h3>${animal.nome}</h3>
                <p><strong>Espécie:</strong> ${animal.especie}</p>
                <p><strong>Raça:</strong> ${animal.raca}</p>
                <p><strong>Idade:</strong> ${animal.idade}</p>
                <p>${animal.descricao}</p>
            `;
            
            grid.appendChild(item);
        });
        
        container.appendChild(grid);
    } else if (query) {
        // Mostrar notificação de nenhum resultado
        showNotification(`Nenhum resultado encontrado para '${query}'.`, 'warning');
        
        const message = document.createElement('p');
        message.textContent = `Nenhum resultado encontrado para "${query}".`;
        container.appendChild(message);
    }
    
    searchSection.appendChild(container);
    
    // Inserir antes da seção hero
    const heroSection = document.querySelector('#inicio');
    if (heroSection) {
        mainElement.insertBefore(searchSection, heroSection);
    } else {
        mainElement.insertBefore(searchSection, mainElement.firstChild);
    }
}
