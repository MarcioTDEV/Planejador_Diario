const inputTitulo = document.querySelector(".form_TituloTarefa")
const inputDescricao = document.querySelector(".form_DescricaoTarefa")

const gradeTarefas = document.querySelector(".box_GradeDeTarefas")
let arrayTarefas = []

//focus and clean
inputTitulo.focus()
function cleanAll(){
    inputTitulo.value = ""
    inputDescricao.value = ""
    inputTitulo.focus()
}


if(localStorage.getItem("array")){
    console.log('existe?')
    arrayTarefas = JSON.parse(localStorage.getItem("array"))
    exibirTarefas()
    console.log(localStorage.getItem("array"))
}
document.addEventListener("keypress",({key})=>{
    if(key === 'Enter'){
        adicionarTarefa()
    }
})


function adicionarTarefa(){
    
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
}




//função vai arualizar a grade de tarefas e criar as div relativamente
function exibirTarefas (){
   
    const dados = localStorage.getItem("array")
    console.log(dados)
    if(dados){
        gradeTarefas.innerHTML = ""
        JSON.parse(dados).map((item,index)=>{
            gradeTarefas.innerHTML+= `
            
            <div class="boxTarefa ${item.status}"  >
                <div class="tituloTarefa">
                    <h1>${item.titulo}</h1>
                </div>
                <div class="descricaoTarefa">
                    <p>${item.descricao}</p>
                </div>
                <div class="statusTarefaStyle">
                    <button class="statusTarefa" value='${index}'>${item.status}</button>
                    <button class="deletar" value='${index}'>deletar</button>
                </div>
        </div>
            `
        })
    }
}

//caputura dos eventos na grade de tarefas para mudar o status e deletar tarefa
gradeTarefas.addEventListener("click", (e)=>{
    if(e.target.classList[0] === "statusTarefa"){
    
        if(e.target.innerHTML === 'pendente'){
            console.log('mudar de no array pendente para concluida')
            arrayTarefas[e.target.value].status = 'concluida'
            localStorage.setItem("array", JSON.stringify(arrayTarefas))
            exibirTarefas()
            return 
        }
    
        if(e.target.innerHTML === 'concluida'){
            console.log('mudar de no array pendente para pendente')
            arrayTarefas[e.target.value].status = 'pendente'
            localStorage.setItem('array', JSON.stringify(arrayTarefas))
            exibirTarefas()
            return 
        }
        
    }
    
    if(e.target.innerHTML === "deletar"){
        console.log(arrayTarefas)

        arrayTarefas.shift(e.target.value)
        console.log(arrayTarefas)
        localStorage.setItem('array', JSON.stringify(arrayTarefas))
        exibirTarefas()
        
    }

    
})





