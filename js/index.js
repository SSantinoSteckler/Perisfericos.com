try {
  fetch('./productos.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud de productos.json');
      }
      return response.json();
    })
    .then((data) => {
      arrayProductos = data;
      cargarProductos(arrayProductos);
    })
    .catch((error) => {
      console.error('Error al cargar JSON', error);
    });
} catch (error) {
  console.error('Error en la solicitud de productos.json', error);
}
let arrayProductos;

const $sectionIndex = document.getElementById('section-index');
const $spanContador = document.getElementById('span-contador');
const $spanContadorDos = document.getElementById('span-contador-dos');
const $botonesProductos = document.querySelectorAll('.button-producto');
let $botonesMasInfo = document.querySelectorAll('.button-masInfo');
let $botonesAgregar = document.querySelectorAll('.button_agregar');
const $divMenu = document.getElementById('div-menu');

$botonesProductos.forEach((btn) => {
  btn.addEventListener('click', categoriaProducto);
});

function categoriaProducto(e) {
  $divMenu.style.display = 'none';
  if (e.currentTarget.id === 'Todos') {
    cargarProductos(arrayProductos);
  } else {
    const categoriaArr = arrayProductos.filter((producto) => {
      return producto.caracteristicas.id === e.currentTarget.id;
    });
    cargarProductos(categoriaArr);
  }
}

function cargarProductos(arrProductos) {
  $sectionIndex.innerHTML = '';

  if (($sectionIndex.classList = 'main-index__section-masInfo')) {
    $sectionIndex.classList.remove('main-index__section-masInfo');
    $sectionIndex.classList.add('main-index__section-index');
  }

  arrProductos.forEach((producto) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('main-index__section-index__div-producto');

    newDiv.innerHTML = `
          <div class="main-index__section-index__div-producto__div-img">
            <img src="${producto.img}" alt="producto" />
          </div>
            <div class="main-index__section-index__div-producto__div-date">
              <h3>${producto.titulo}</h3>
              <span>$${producto.precio}</span>
              <button class="button-masInfo" id="${producto.id}" >
                <i class="bi bi-layout-text-window-reverse"></i>
                Mas Info
              </button>
              <button id="${producto.id}" class="button_agregar">Agregar</button>
            </div>
          `;
    $sectionIndex.appendChild(newDiv);
  });
  $botonesMasInfo = document.querySelectorAll('.button-masInfo');
  $botonesMasInfo.forEach((btn) => {
    btn.addEventListener('click', masInfo);
  });

  $botonesAgregar = document.querySelectorAll('.button_agregar');
  $botonesAgregar.forEach((btn) => {
    btn.addEventListener('click', agregarCarro);
  });
}

function masInfo(e) {
  $sectionIndex.innerHTML = '';
  const productoEspecifico = arrayProductos.find((producto) => {
    return producto.id === e.currentTarget.id;
  });

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('main-index__section-masInfo__div-producto');
  $sectionIndex.classList.remove('main-index__section-index');
  $sectionIndex.classList.add('main-index__section-masInfo');

  infoDiv.innerHTML = `
            <div class="main-index__section-masInfo__div-producto__div-image">
              <img src="${productoEspecifico.img}" alt="producto" />
            </div>
            <div class="main-index__section-masInfo__div-producto__div-text">
              <h2>${productoEspecifico.titulo}</h2>
              <div>
                <i class="bi bi-star-fill"></i>

                <i class="bi bi-star-fill"></i>

                <i class="bi bi-star-fill"></i>

                <i class="bi bi-star-fill"></i>

                <i class="bi bi-star-fill"></i>
              </div>
              <span>$${productoEspecifico.precio}</span>
       
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laudantium voluptatum nemo laboriosam autem eaque itaque, ut sed
                obcaecati fugit vero doloremque dolore facilis delectus, aliquam
                error deserunt. Ipsam, magnam itaque. Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Unde fugit sint veniam
                voluptas, dignissimos molestias officiis corrupti error aperiam
              </p>
              <div class="main-index__section-masInfo__div-producto__div-text__div-boton"> 
              <img src="./img/Tc-logos.png" alt="medios-de-pago" />
               <button id="${productoEspecifico.id}" class="button-agregar">Agregar</button>
              </div>
            </div>
        

          `;
  $sectionIndex.appendChild(infoDiv);

  $botonesAgregar = document.querySelector('.button-agregar');
  $botonesAgregar.addEventListener('click', agregarCarro);
}

let carroCompras = [];

let carroComprasLocalStorage = JSON.parse(localStorage.getItem('productos'));

if (carroComprasLocalStorage) {
  carroCompras = carroComprasLocalStorage;
  contadorProductosSpan(carroCompras);
} else {
  carroCompras = [];
}

function agregarCarro(e) {
  let productoEncontrado = arrayProductos.find((producto) => {
    return producto.id === e.currentTarget.id;
  });

  if (carroCompras.some((producto) => producto.id === e.currentTarget.id)) {
    let indice = carroCompras.findIndex(
      (producto) => producto.id === e.currentTarget.id
    );
    carroCompras[indice].cantidad++;
  } else {
    productoEncontrado.cantidad = 1;
    carroCompras.push(productoEncontrado);
  }
  contadorProductosSpan(carroCompras);
  localStorage.setItem('productos', JSON.stringify(carroCompras));
}

export function contadorProductosSpan(arr) {
  let contador = arr.reduce((acc, producto) => {
    return acc + producto.cantidad;
  }, 0);
  $spanContador.innerHTML = `(${contador})`;
  $spanContadorDos.innerHTML = `(${contador})`;
}

//Menu hamburgesa

const $botonMenuHamburgesa = document.getElementById('button-menu-hamburgesa');
$botonMenuHamburgesa.addEventListener('click', abrirMenu);

function abrirMenu() {
  $divMenu.style.display = 'block';

  const $botonCerrarMenu = document.getElementById('cerrar-menu');
  $botonCerrarMenu.addEventListener('click', () => {
    $divMenu.style.display = 'none';
  });
}

window.addEventListener('resize', manejarCambioDeTamaño);

function manejarCambioDeTamaño() {
  const anchoVentana = window.innerWidth;

  if (anchoVentana > 1080) {
    $divMenu.style.display = 'none';
  }
}
