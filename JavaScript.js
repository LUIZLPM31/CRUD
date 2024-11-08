
        // Função para adicionar usuário ao LocalStorage
        function addUser() {
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const phone = document.getElementById('userPhone').value;

            if (name && email && phone) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.push({ name, email, phone });
                localStorage.setItem('users', JSON.stringify(users));
                renderUserList();
                clearForm();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        }

        // Função para listar usuários
        function renderUserList() {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const tableBody = document.getElementById('userTableBody');
            tableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

            users.forEach((user, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <button class="update" onclick="editUser(${index})">Editar</button>
                        <button class="delete" onclick="deleteUser(${index})">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Função para editar usuário
        function editUser(index) {
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users[index];
            document.getElementById('userName').value = user.name;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userPhone').value = user.phone;

            deleteUser(index); // Exclui o usuário antigo para atualizá-lo
        }

        // Função para excluir usuário
        function deleteUser(index) {
            const users = JSON.parse(localStorage.getItem('users'));
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            renderUserList();
        }

        // Função para limpar o formulário após a inserção ou edição
        function clearForm() {
            document.getElementById('userName').value = '';
            document.getElementById('userEmail').value = '';
            document.getElementById('userPhone').value = '';
        }

        // Renderiza a lista de usuários ao carregar a página
        window.onload = function() {
            renderUserList();
        }
