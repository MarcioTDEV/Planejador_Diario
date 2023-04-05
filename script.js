const inputTitulo = document.querySelector(".form_TituloTarefa")
const inputDescricao = document.querySelector(".form_DescricaoTarefa")
const botaoAdicionar = document.querySelector(".AdicionarTarefa")
const gradeTarefas = document.querySelector(".box_GradeDeTarefas")

//focus and clean
inputTitulo.focus()
function cleanAll(){
    inputTitulo.value = ""
    inputDescricao.value = ""
    inputTitulo.focus()
}



let arrayTarefas = []

if(typeof(localStorage.getItem("array"))){
    arrayTarefas = JSON.parse(localStorage.getItem("array"))
    exibirTarefas()
    console.log(localStorage.getItem("array"))
}


botaoAdicionar.addEventListener("click", (e)=>{
    e.preventDefault()

    if(inputTitulo.value === "" || inputDescricao.value === ""){
        alert("O título e a descrição não podem ficar em branco!")
        return
    }

    arrayTarefas.push({
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        status: "pendente"
    })

    localStorage.setItem("array", JSON.stringify(arrayTarefas))
    exibirTarefas()
    cleanAll()
})


function exibirTarefas (){
    const dados = localStorage.getItem("array")
    console.log(dados)
    if(dados){
        gradeTarefas.innerHTML = ""
        JSON.parse(dados).map(item=>{
            gradeTarefas.innerHTML+= `
            
            <div class="boxTarefa"  ${item.status}>
                <div class="tituloTarefa">
                    <h1>${item.titulo}</h1>
                </div>
                <div class="descricaoTarefa">
                    <p>${item.descricao}</p>
                </div>
                <div class="statusTarefa">
                    <button class="pendente">Pendente</button>
                    <button class="deletar">Deletar</button>
                </div>
            
        </div>
            `
        })
    }
}
