const inputTarea = document.getElementById('inputTarea');
const selectTarea = document.getElementById('selectTarea')
const buttonGuardar = document.getElementById('buttonGuardar')
const divTareas = document.querySelector('.articulos')
const selectPrioridad = document.getElementById('selectPrioridad')
const inputBuscador = document.getElementById('inputBuscador')
const name = document.getElementById('name')

/*let nombrecito = prompt('Deseas que te ofrezca placeres hedonistas y licenciosos conocidos solo por aquellos que dominan las artes carnales, te muestre oscuras fascinaciones y éxtasis prohibidos en los que los mortales no debemos ni pensar, además de secretos angelicales que te lleven a lo más profundo de los deseos humanos. Entonces dime tu nombre:')*/

//name.innerText = 'Mi Lista de Tareas ' + nombrecito;

/* Recupera el array del local storage */
if (localStorage.getItem('arrayTasks')) {
    //Devuelve el valor almacenado o undefined.
    tareas = JSON.parse(localStorage.getItem('arrayTasks'));

}


const pintarTareas = (array) => {
    divTareas.innerHTML = ' '//Borra las tareas para meter la nueva array

    for (let task of array) {

        const article = document.createElement('article')
        const h3 = document.createElement('h3')
        const inputEliminar = document.createElement('input')

        article.classList.add(task.prioridad)
        h3.innerText = task.titulo;
        inputEliminar.type = 'button'
        inputEliminar.value = 'Eliminar'
        inputEliminar.dataset.taskid = task.idTarea

        article.append(h3, inputEliminar);
        divTareas.append(article);

        inputEliminar.addEventListener('click', (event) => {
            event.target.parentNode.remove()

            tareas = array.filter(tareita => parseInt(event.target.dataset.taskid) !== parseInt(tarea.idTarea))
            //  filtra objetos de la array que no han sido eliminados mediante el id 


            const strTask = JSON.stringify(tareas)
            localStorage.setItem('arrayTasks', strTask)
            const prsTask = JSON.parse(localStorage.getItem('arrayTasks'))
            pintarTareas(prsTask)
            /* Guarda y pinta las tareas almacenadas en el local storage*/
            /* Po-up de la librería sweetalert */
            let gifNumber
            gifNumber = parseInt(Math.random() * 10)
            Swal.fire({
                title: 'Eliminado exitosamente<br>',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff',
                backdrop: `
              rgba(0,0,123,0.4)
              url("${gifs[gifNumber]}")
              left center
              
              no-repeat
            `
            })
        })
    }

}
pintarTareas(tareas)

let i = 1
buttonGuardar.addEventListener('click', () => {

    if (selectTarea.value === 'Selecciona una prioridad' || inputTarea.value === " ") {
        alert(' UNDEFINED, NULL Y NaN.')
    } else {
        tareas.push({
            idTarea: 2 + i,
            titulo: `${inputTarea.value}`,
            prioridad: `${selectTarea.value}`
            /*  modificar la prioridad con un listener en el select*/
        })
        const strTask = JSON.stringify(tareas)
        localStorage.setItem('arrayTasks', strTask)
        const prsTask = JSON.parse(localStorage.getItem('arrayTasks'))
        i++
        inputTarea.value = ' ' //Borra el texto del input cada vez que se guarda

        pintarTareas(prsTask) // Pinta la array guardado en localStorage

        /* Po-up de la librería sweetalert */
        
    }


})





const taskFilter = (array) => {

    selectPrioridad.addEventListener('keydown', (event) => {
        let predeterminada = 'Selecciona una prioridad'; //Se utiliza para pintar toda la array cuando no se este filtrando nada, se iguala al valor predeterminada y se le mete la función para pintar toda el array.

        if (event.target.value !== predeterminada) {
            let listaTareas = array.filter(task => task.prioridad === event.target.value)
            pintarTareas(listaTareas) //Devuelve una array filtrando prioridades
        } else {
            pintarTareas(array)
        }
    })

    inputBuscador.addEventListener('input', (event) => {

        /*         if (event.target.value) {
                    taskList = array.filter(task => event.target.value.toLowerCase() === task.titulo.toLowerCase())
                    pintarTareas(taskList)
                } else {
                    pintarTareas(array)
                } */

        let listaFiltrarBusqueda = new Array()
        for (let task of array) {
            let title = task.titulo.toLowerCase();
            if (title.indexOf(event.target.value.toLowerCase()) !== -1) {
                //Title es el titulo de cada tarea.
                //indexOf va recorriendo cada letra de title y si el valor del input coincide con la letra de title devuelve la tarea y la mete en una array que posteriormente se pinta.
                listaFiltrarBusqueda.push(task)
            }
        }
        pintarTareas(listaFiltrarBusqueda)



    }
    )
}

taskFilter(tareas)



