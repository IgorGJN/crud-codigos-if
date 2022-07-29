'use strict'

/* Controle da pagina */

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')
    

const tempClient = {
    nome: "Fernando",
    email: "igor@github.com.br",
    celular: "73982238896",
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




// Eventos

document.getElementById('cadastrarIF')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
