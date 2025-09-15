// Função de login conectada ao backend

/* 
Função de conexão com o backend para autenticação do usuário,
Utilizamos a função fetch para enviar os dados de login e receber o token JWT.
*/
async function login(email, password) {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login bem-sucedido!');
        fecharModal('loginModal');
        // Aqui você pode atualizar a interface para mostrar área privada
    } else {
        alert(data.error || 'Erro no login');
    }
}

// Eventos para abrir/fechar modais e submit dos formulários
document.addEventListener('DOMContentLoaded', function() {
    // Abrir modal de login
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            abrirModal('loginModal');
        });
    }

    // Abrir modal de registro
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            abrirModal('registerModal');
        });
    }

    // Fechar modais ao clicar fora do conteúdo
    document.querySelectorAll('.modal').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                fecharModal(modal.id);
            }
        });
    });

    // Submit do formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }

    // Submit do formulário de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const studentId = document.getElementById('registerStudentId').value;
            cadastrarUsuario({ name, email, password, studentId });
        });
    }
});

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'block';
}

function fecharModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }
});

async function cadastrarUsuario({ name, email, password, studentId }) {
    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, studentId })
    });
    const data = await response.json();
    if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        fecharModal('registerModal');
    } else {
        alert(data.error || 'Erro no cadastro');
    }
}