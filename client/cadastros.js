document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert('Erro ao carregar usuários: ' + errorData.message);
            return;
        }

        const users = await response.json();
        const usersContainer = document.getElementById('users');

        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'bg-white shadow-lg border border-gray-200 p-6 rounded-lg mb-6';
            userElement.innerHTML = `
                <h2 class="text-xl font-semibold text-blue-500 mb-4">${user.nome}</h2>
                <p><strong>Matrícula:</strong> ${user.matricula}</p>
                <p><strong>Função:</strong> ${user.funcao}</p>
                <p><strong>Nome de Usuário:</strong> ${user.username}</p>
            `;
            usersContainer.appendChild(userElement);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar usuários');
    }
});