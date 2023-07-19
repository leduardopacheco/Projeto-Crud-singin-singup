var arrayUser = localStorage.getItem("usuarios") == "null" ? [] : JSON.parse(localStorage.getItem('usuarios'))
console.log(arrayUser)


function cadastrarUsuario(){
    var name = document.getElementById("name").value
    var usuario = document.getElementById("usuario").value
    var senha = document.getElementById("senha").value

    var objeto = {
        "nome" : name,
        "usuario":usuario,
        "senha":senha
    }

    arrayUser.push(objeto)

    localStorage.setItem("usuarios",JSON.stringify(arrayUser))

    console.log(arrayUser)
}