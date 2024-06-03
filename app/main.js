document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');
    const userTable = document.getElementById('userTable');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            try {
                const response = await axios.post('/api/login', { email, password });
                if (response.data.success) {
                    window.location.href = 'admin.html';
                } else {
                    alert('Login falhou!');
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const firstname = cadastroForm.firstname.value;
            const lastname = cadastroForm.lastname.value;
            const email = cadastroForm.email.value;
            const password = cadastroForm.password.value;
            try {
                await axios.post('/api/users', { firstname, lastname, email, password });
                alert('Usuário cadastrado com sucesso!');
                window.location.href = 'login.html';
            } catch (error) {
                console.error(error);
            }
        });
    }

    if (userTable) {
        const loadUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                const users = response.data;
                const tbody = userTable.querySelector('tbody');
                tbody.innerHTML = '';
                users.forEach(user => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="editUser('${user._id}')">Editar</button>
                            <button onclick="deleteUser('${user._id}')">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error(error);
            }
        };

        window.editUser = async (id) => {
            // Implementar a lógica de edição de usuário
        };

        window.deleteUser = async (id) => {
            try {
                await axios.delete(`/api/users/${id}`);
                loadUsers();
            } catch (error) {
                console.error(error);
            }
        };

        loadUsers();
    }
});
