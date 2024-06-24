class Nodo {
  constructor(dato) {
    this.dato = dato;
    this.completado = false;
    this.siguiente = null;
  }
}

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.cargarDatos();
  }

  agregar(dato) {
    const nuevoNodo = new Nodo(dato);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = nuevoNodo;
    }
    this.guardarDatos();
  }

  alternarCompletado(dato) {
    let actual = this.cabeza;
    while (actual) {
      if (actual.dato === dato) {
        actual.completado = !actual.completado;
        break;
      }
      actual = actual.siguiente;
    }
    this.guardarDatos();
  }

  convertirAArray() {
    const arreglo = [];
    let actual = this.cabeza;
    while (actual) {
      arreglo.push({ dato: actual.dato, completado: actual.completado });
      actual = actual.siguiente;
    }
    return arreglo;
  }

  guardarDatos() {
    localStorage.setItem('listaTareas', JSON.stringify(this.convertirAArray()));
  }

  cargarDatos() {
    const datos = localStorage.getItem('listaTareas');
    if (datos) {
      const arregloDatos = JSON.parse(datos);
      arregloDatos.forEach(item => {
        const nuevoNodo = new Nodo(item.dato);
        nuevoNodo.completado = item.completado;
        this.agregar(nuevoNodo.dato);
      });
    }
  }

  eliminarTodo() {
    this.cabeza = null;
    localStorage.removeItem('listaTareas');
    this.guardarDatos();
  }
}

const listaTareas = new ListaEnlazada();

function agregarTarea() {
  const inputTarea = document.getElementById('taskInput');
  const tarea = inputTarea.value.trim();
  if (tarea === '') return;

  listaTareas.agregar(tarea);
  inputTarea.value = '';
  renderizarTareas();
}

function toggleTarea(tarea) {
  listaTareas.alternarCompletado(tarea);
  renderizarTareas();
}

function eliminarTodasLasTareas() {
  listaTareas.eliminarTodo();
  renderizarTareas();
}

function renderizarTareas() {
  const ul = document.getElementById('taskList');
  ul.innerHTML = '';

  listaTareas.convertirAArray().forEach(tarea => {
    const li = document.createElement('li');
    li.textContent = tarea.dato;
    li.classList.add('task-item');
    if (tarea.completado) {
      li.classList.add('checked');
    }

    li.onclick = () => toggleTarea(tarea.dato);

    ul.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarTareas();
});

const botonEliminarTodo = document.getElementById('botonEliminarTodo');
botonEliminarTodo.addEventListener('click', eliminarTodasLasTareas);


/* Ingeniero, estuve luchando para poder lograr el todo list con todo lo que pidio, pero el hacerlo con listas enlazadas fue 
   muy complicado, no logre hacer que se pudieran eliminar las listas por separado, por lo que al final opte por usar un boton
   para eliminarlas todas tanto como del contenedor como del localStorage.
*/