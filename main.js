'use strict'

/* Controle da pagina */

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}
    

const tempClient = {
    nome: "Fernando",
    email: "igor@github.com.br",
    telefone: "73982238896",
    cidade: "itanhem"
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage =(dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));


// CRUD - creat read update delete

// CRUD - READ
const readClient = () => getLocalStorage();

// CRUD - CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push (client)
    setLocalStorage(dbClient)
}

// CRUD - UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// CRUD - DELETE
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// Verificação dos clientes
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// Limpa campos

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

// Interação com o layout

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cidade: document.getElementById('cidade').value,
        }
        const index = document.getElementById('nome').dataset.index
        if (index == "new") {
            createClient(client);
            updateTable();
            closeModal();
        } else {
            updateClient(index, client)
            updateTable();
            closeModal();
        }
    }
}

// Atualização da tela

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.telefone}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}" data-action="edit">editar</button>
        <button type="button" class="button red" id="delete-${index}" data-action="delete">excluir</button>
    </td>
    `
    document.querySelector('#tabela-cliente>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tabela-cliente>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    clearTable();
    const dbClient = readClient();
    dbClient.forEach(createRow);
}

updateTable();

// Editar e excluir linhas

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('telefone').value = client.telefone;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index;
    fillFields(client);   
    openModal(); 
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index);
        } else {
            const client = readClient()[index]
            const responde = confirm (`Deseja realmente excluir o cliente ${client.nome}`)
            if (responde) {
                deleteClient(index);
                updateTable();
            }
        }
    } 
}

// Eventos

document.getElementById('cadastrarIF')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tabela-cliente>tbody')
    .addEventListener('click', editDelete)