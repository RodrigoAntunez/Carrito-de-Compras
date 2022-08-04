// Variables 
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


// listeners
cargarEventlistener();
function cargarEventlistener(){
    //Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    //Dispara cuando se presiona borrar curso
    carrito.addEventListener('click', borrarCurso);

    //Dispara cuando se presiona el boton vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //al cargar el documento, cargar los cursos del localStorage
    document.addEventListener('DOMContentLoaded', cargarCursoLocalStorage);
}



//functions
//funcion que agrega al carrito
function comprarCurso(e){
    e.preventDefault()
    //DElegation para agregar al carrito
    if(e.target.classList.contains('agregar-carrito')){//Cuando el elemento que se presiona click tenga esta clase, se ejecuta la funcion
        const curso = e.target.parentElement.parentElement;//Se obtiene el curso que se presiono, pero al nodo padre.
        //Enviamos el curso al carrito
        leerDatosCurso(curso);
    }
}

//lee datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);

}

//muestra el curso seleccionado en el carrito

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> <img src="${curso.imagen}" width=100></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td> <a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//borra el curso seleccionado del carrito
function borrarCurso(e){
    e.preventDefault();

    let curso, cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();

        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    
    }

    eliminarCursoLocalStorage(cursoId);
}

//Elimina los cursos del carrito en el DOM
function vaciarCarrito(){
    //forma lenta
    //listaCursos.innerHTML = '';
    //forma rapida
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    
    //vacias localStorage
    vaciarLocalStorage();
    return false;

}

//Guarda los cursos en el carrito en el localStorage
function guardarCursoLocalStorage(curso){
    let cursos;
    //toma el valor de un arreglo con datos de localStorage o vacios
    cursos = obtenerCursoLocalStorage();
    
    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//comprubea que haya elementos en localStorage
function obtenerCursoLocalStorage(){
    let cursosLS;

    //comprobamos si hay algo en el localStorage
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}


//imprime los cursos del localStorage en el carrito
function cargarCursoLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursoLocalStorage();
    cursosLS.forEach(function(curso){
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${curso.imagen}" width=100></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td> <a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;
        listaCursos.appendChild(row);
    });
}

//Elimina un curso del localStorage
function eliminarCursoLocalStorage(curso){

    let cursosLS;
    cursosLS = obtenerCursoLocalStorage();
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    }
    );
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
    localStorage.removeItem('cursosLS');
}

// Elimina todos los cursos del localStorage
function vaciarLocalStorage(){
    localStorage.clear();
}