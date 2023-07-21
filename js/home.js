var arrayUser = localStorage.getItem("usuarios") == "null" ? [] : JSON.parse(localStorage.getItem('usuarios'))
console.log(arrayUser, 'salvou')

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const squantidade = document.querySelector('#m-quantidade')
const spreço = document.querySelector('#m-preço')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function login() {
    try {
        let validar = false
        var user = document.getElementById("usuario").value
        var senha = document.getElementById("senha").value


        for (let i = 0; i < arrayUser.length; i++) {
            var userSalvo = arrayUser[i].usuario

            var senhaSalva = arrayUser[i].senha

            if (user == userSalvo && senha == senhaSalva) {
                validar = true;
            }
            
        }

        if (validar) {
            setTimeout(() => {
                window.location.href = "../pages/home.html";
            }, 500);
            alert("Usuário logado com sucesso!")
        }else{
            alert("Usuario não existe")
            return
        }


    } catch (error) {
        console.log("esse erro: ", error)
    }
}

function cadastrarUsuario() {
    try {
        var name = document.getElementById("name").value
        var usuario = document.getElementById("usuario").value
        var senha = document.getElementById("senha").value
        var confirmsenha = document.getElementById("confirmSenha").value

        if (senha != confirmsenha) {
            alert("As senhas devem ser iguais!")
            return
        }

        var objeto = {
            "nome": name,
            "usuario": usuario,
            "senha": senha,
            "confirmSenha": confirmsenha,
        }

        arrayUser.push(objeto)

        localStorage.setItem("usuarios", JSON.stringify(arrayUser))


        setTimeout(() => {
            window.location.href = "../pages/index.html";
        }, 800);

    } catch (error) {
        console.log('erro: ', error)
    }
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sNome.value = itens[index].nome
        squantidade.value = itens[index].quantidade
        spreço.value = itens[index].preço
        id = index
    } else {
        sNome.value = ''
        squantidade.value = ''
        spreço.value = ''
    }

}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.quantidade}</td>
    <td>R$ ${item.preço}</td>
    <td class="acao">
    <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
    <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
`
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sNome.value == '' || squantidade.value == '' || spreço.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].quantidade = squantidade.value
        itens[id].preço = spreço.value
    } else {
        itens.push({ 'nome': sNome.value, 'quantidade': squantidade.value, 'preço': spreço.value })
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()