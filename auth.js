// Função para fazer login
function login(email, password) {
    // Em um sistema real, você validaria as credenciais com um servidor
    // Aqui vamos apenas simular um login bem-sucedido
    const userData = {
        email: email,
        name: email.split('@')[0], // Usando parte do email como nome
        isLoggedIn: true,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('userSession', JSON.stringify(userData));
    return true;
}

// Função para verificar se está logado
function isLoggedIn() {
    const session = localStorage.getItem('userSession');
    if (!session) return false;
    
    const userData = JSON.parse(session);
    return userData.isLoggedIn;
}

// Função para fazer logout (pode ser chamada pelo console)
function logout() {
    localStorage.removeItem('userSession');
    window.location.href = '/index.html';
}

// Função para obter dados do usuário
function getUserData() {
    const session = localStorage.getItem('userSession');
    if (!session) return null;
    return JSON.parse(session);
}

// Função para verificar e redirecionar se não estiver logado
function checkAuth() {
    if (!isLoggedIn()) {
        window.location.href = '/login.html';
    }
} 