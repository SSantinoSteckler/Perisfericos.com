import { contadorProductosSpan } from './index.js';
const arrProductosSelecionados = JSON.parse(localStorage.getItem('productos'));

const $sectionPanel = document.getElementById('section-panel-venta');

document.addEventListener('DOMContentLoaded', mostrarProductos);

function mostrarProductos() {
  if (arrProductosSelecionados.length > 0) {
    $sectionPanel.innerHTML = '';
    arrProductosSelecionados.forEach((producto) => {
      const $divCarro = document.createElement('div');

      $divCarro.classList.add('main-panel-venta__section-panel__div-carro');
      $divCarro.innerHTML = `
            <div>
              <img src="./${producto.img}" alt="${producto.titulo}" />
            </div>
            <div>
              <span>Nombre</span>
              <h3>${producto.titulo}</h3>
            </div>
            <div>
              <span>Cantidad</span>
              <h3>${producto.cantidad}</h3>
            </div>
            <div>
              <span>Precio</span>
              <h3>$${producto.precio}</h3>
            </div>

            <div>
              <span>Subtotal</span>
              <h3>$${producto.precio * producto.cantidad}</h3>
            </div>
            <button class="button-eliminar" id="${producto.id}">
            <i class="bi bi-trash3"></i>
            </button>
            `;

      $sectionPanel.appendChild($divCarro);
    });

    const $divPanel = document.createElement('div');
    $divPanel.classList.add(
      'main-panel-venta__section-panel__div-panel-compra'
    );
    $divPanel.innerHTML = `
             <div>
              <button id="button-vaciar">Vaciar Carrito</button>
            </div>
            <div>
              <h3>TOTAL : $${calcularTotalCarrito()}</h3>
              <button id="button-confirmar-compra">Confirmar Compra</button>
            </div>

           <div id="div-modal" class="modal-compra">
            <div class="div-modal__contenido-modal">
             <i class="bi bi-x-circle-fill" id="boton-cierre-modal"></i>
               <p>Deseas confimar la compra?</p>
               <div>
                  <button id="button-confirmar-modal">Confirmar</button>
                   <button id="button-cancelar-modal">Cancelar</button>
               </div>
            </div>
          </div>
            `;
    $sectionPanel.appendChild($divPanel);
  } else {
    $sectionPanel.innerHTML = '<p>CARRO VACIO</p>';
  }
  actualizarBotones();
  contadorProductosSpan(arrProductosSelecionados);
}

function actualizarBotones() {
  const $buttonVaciarCarro = document.getElementById('button-vaciar');
  $buttonVaciarCarro.addEventListener('click', vaciarCarro);

  const $botonEliminarProducto = document.querySelectorAll('.button-eliminar');
  $botonEliminarProducto.forEach((btn) => {
    btn.addEventListener('click', eliminarProducto);
  });

  const $botonConfirmarCompra = document.getElementById(
    'button-confirmar-compra'
  );
  $botonConfirmarCompra.addEventListener('click', abrirModal);
}

function abrirModal() {
  const $modal = document.getElementById('div-modal');
  const $botonCierreModal = document.getElementById('boton-cierre-modal');
  $modal.style.display = 'flex';

  $botonCierreModal.addEventListener('click', () => {
    $modal.style.display = 'none';
  });

  const $botonConfirmarModal = document.getElementById(
    'button-confirmar-modal'
  );
  $botonConfirmarModal.addEventListener('click', () => {
    arrProductosSelecionados.splice(0, arrProductosSelecionados.length);
    actalizarLocalStorage(arrProductosSelecionados);
    $sectionPanel.innerHTML = '<p>Gracias por su compra</p>';
  });

  const $botonCancelarModal = document.getElementById('button-cancelar-modal');
  $botonCancelarModal.addEventListener('click', () => {
    $modal.style.display = 'none';
  });
}

function calcularTotalCarrito() {
  let total = arrProductosSelecionados.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);
  return total;
}

function actalizarLocalStorage(arr) {
  localStorage.setItem('productos', JSON.stringify(arr));
}

function eliminarProducto(e) {
  let productoEliminar = arrProductosSelecionados.findIndex(
    (producto) => producto.id === e.currentTarget.id
  );
  arrProductosSelecionados.splice(productoEliminar, 1);
  actalizarLocalStorage(arrProductosSelecionados);
  mostrarProductos();
  contadorProductosSpan(arrProductosSelecionados);
}

function vaciarCarro() {
  arrProductosSelecionados.splice(0, arrProductosSelecionados.length);
  actalizarLocalStorage(arrProductosSelecionados);
  contadorProductosSpan(arrProductosSelecionados);
  mostrarProductos();
}
