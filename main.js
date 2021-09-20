// Se crea una clase para manejar los elementos que contienen los textos generados
class LoremIpsum extends HTMLDivElement {
  constructor (){
    super();
    this.classList.add('post')
  }

  setPostID = function (id) {
    id = id.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    this.id = `post${id}`;
  }

  setPostText = function (text) {
    let paragraph = document.createElement('p');
    paragraph.appendChild(
      document.createTextNode(text)
    );
    this.appendChild(paragraph);
  }
}

// Registramos el nuevo elemento
customElements.define('lorem-ipsum', LoremIpsum, {extends: 'div'});

// Seleccionamos los botones que se van a utilizar
var btnGenerar = document.getElementById("generar");
var btnEncontrar = document.getElementById("encontrar");

function generarTextos() {
  // Seleccionamos el elemento que contendrá los textos
  let contenedor = document.querySelector("div#principal");
  let cantidadPosts = 5;
  let post;
  let id;
  let i;

  while (contenedor.lastElementChild) {
    contenedor.removeChild(contenedor.lastChild);
  }

  for (i = 0; i < cantidadPosts; i++){
    id = parseInt(Math.random() * 100 + 1);
    post = createPost(id);
    contenedor.appendChild(post);
  }

  btnEncontrar.disabled = false;
  btnEncontrar.addEventListener('click', encontrarTexto);
}

function createPost(id){
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  const post = new LoremIpsum();
  fetch(API_URL + `/${id}`)
  .then(response => {
    return response.json();
  })
  .then(postJSON => {
    post.setPostID(id);
    post.setPostText(postJSON.body);
  });
  return post;
}

function encontrarTexto() {
  let conteoLetras = new Array();
  posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    let texto = post.children[0].innerText;
    texto = texto.split(" ").join();
    texto = texto.split(",").join();
    texto = texto.split(".").join();
    conteoLetras.push(texto.length);
  });
  indexMayor = conteoLetras.findIndex(value => value === Math.max(...conteoLetras));
  posts[indexMayor].classList.add('destacado');
  alert(posts[indexMayor].children[0].innerText);
}

// Agregamos los eventos a los botones
btnGenerar.addEventListener("click", generarTextos);