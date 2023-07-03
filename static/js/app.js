//Creamos una variable global para mantener el estado de visibilidad del carro de compras.
var carritoVisible = false;
var is_active = document.getElementById('user_activo').innerText;

//URL para obtencion y envio de datos a la base de datos
const URL= 'http://127.0.0.1:5000/';

if (is_active !== ''){
    userLog = true;
}else{
    userLog = false;
}

//Cargamos y comprobamos datos del usuario si ya inicio sesion
check_login(userLog);

//Espermos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    
    // if (userLog ==='true'){
    //     texto.innerText = `${userNam}`;
    //     document.getElementById('nav_carrito').classList.add('nav_carrito-inactivo');
    //     document.getElementById('close_session').classList.add('close_session-activo');
        
    // }else{
    //     texto.innerText = ''
    //     document.getElementById('nav_carrito').classList.remove('nav_carrito-inactivo');
    //     document.getElementById('close_session').classList.remove('close_session-activo');
    // }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('btn-agregar-producto');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregremos funcionalidad a los botones eliminar del carrito
    var btnEliminarProductos = document.getElementsByClassName('btn-eliminar-producto');
    for (var i = 0; i < btnEliminarProductos.length; i++) {
        var button = btnEliminarProductos[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
    
    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)

    //Agregamos funcionalidad al botón cerrar sesion
    document.getElementById('btn_close_session').addEventListener('click', closeSession)

}
//Función para el boton click de agregar al carrito
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-producto')[0].innerText;
    var precio = item.getElementsByClassName('precio-producto')[0].innerText;
    var codigo = item.getElementsByClassName('codigo-producto')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-producto')[0].src;
    // console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc, codigo);

    hacerVisibleCarrito();
}

function check_login(userLog){
    if (userLog === true){   
        document.getElementById('nav_carrito').classList.add('nav_carrito-inactivo');
        document.getElementById('close_session').classList.add('close_session-activo');
       
    }else{
       
        document.getElementById('nav_carrito').classList.remove('nav_carrito-inactivo');
        document.getElementById('close_session').classList.remove('close_session-activo');
    }
   
}
//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc, codigo) {
    var item = document.createElement('div');
    item.classList.add = ('producto');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-codigo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == codigo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

        

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-codigo">${codigo}</span>
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar-producto">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar-producto')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    agregar_carrito(codigo, titulo, precio);
    //Actualizamos total
    actualizarTotalCarrito();
}
//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('container-carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('container-productos')[0];
    items.style.width = '60%';
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(is_active) {
    if (is_active !== '') {
        //Elimino todos los elmentos del carrito
        alert("Gracias por la compra");
        var carritoItems = document.getElementsByClassName('carrito-items')[0];
        while (carritoItems.hasChildNodes()) {
            carritoItems.removeChild(carritoItems.firstChild)
        }

        actualizarTotalCarrito();
        ocultarCarrito();



        return;
    } else {
        alert("No puede pagar sin antes iniciar sesión.");
    }
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var codigo = selector.parentElement.getElementsByClassName('carrito-item-codigo')[0].innerText;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    sumar_cantidad(codigo);
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var codigo = selector.parentElement.getElementsByClassName('carrito-item-codigo')[0].innerText;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        restar_cantidad(codigo);
        actualizarTotalCarrito();
    }
}
//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    var item = buttonClicked.parentElement;
    buttonClicked.parentElement.parentElement.remove();
    var codigo = item.getElementsByClassName('carrito-item-codigo')[0].innerText;
    //Actualizamos el total del carrito
    eliminar_carrito(codigo);   
    actualizarTotalCarrito();
    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('container-carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('container-productos')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('container-carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

}
//Funcion para agregar producto a la base de datos ''carrito''
function agregar_carrito(codigo, titulo, precio){

    // Creamos un objeto con los datos del producto
    var producto = {
    codigo,
    titulo,
    'cantidad': 1,
    precio
    };

    fetch(URL + 'carrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(function (response) {
            // Código para manejar la respuesta
            if (response.ok) {
                return response.json(); // Parseamos la respuesta JSON
            } else {
                // Si hubo un error, lanzar explícitamente una excepción
                // para ser "catcheada" más adelante
                throw new Error('Error al obtener respuesta.');
            }
        })
        // .then(function (data) {
        //     alert('Producto agregado correctamente.');
            
        // })
        .catch(function (error) {
            // Código para manejar errores
            alert('Error al agregar el producto.');
        });

}
//Funcion para eliminar producto en la base de datos ''carrito''
function eliminar_carrito(codigo){

   
    // Creamos un objeto con los datos del producto
    var producto = {
    codigo
    };

    fetch(URL + 'carrito/' + codigo, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(function (response) {
            // Código para manejar la respuesta
            if (response.ok) {
                return response.json(); // Parseamos la respuesta JSON
            } else {
                // Si hubo un error, lanzar explícitamente una excepción
                // para ser "catcheada" más adelante
                throw new Error('Error al obtener respuesta.');
            }
        })
        // .then(function (data) {
        //     alert('Producto eliminado correctamente.');
            
        // })
        .catch(function (error) {
            // Código para manejar errores
            alert('Error al agregar el producto.');
        });

}
//Funcion para sumar producto a la base de datos ''carrito''
function sumar_cantidad(codigo){

    var cantidad= 1;
    // Creamos un objeto con los datos del producto
    var producto = {
    codigo,
    cantidad
    };

    fetch(URL + 'carrito/' + codigo, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(function (response) {
            // Código para manejar la respuesta
            if (response.ok) {
                return response.json(); // Parseamos la respuesta JSON
            } else {
                // Si hubo un error, lanzar explícitamente una excepción
                // para ser "catcheada" más adelante
                throw new Error('Error al obtener respuesta.');
            }
        })
        // .then(function (data) {
        //     alert('Producto eliminado correctamente.');
            
        // })
        .catch(function (error) {
            // Código para manejar errores
            alert('Error al agregar el producto.');
        });

}
//Funcion para restar producto a la base de datos ''carrito''
function restar_cantidad(codigo){

    var cantidad= -1;
    // Creamos un objeto con los datos del producto
    var producto = {
    codigo,
    cantidad
    };

    fetch(URL + 'carrito/' + codigo, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(function (response) {
            // Código para manejar la respuesta
            if (response.ok) {
                return response.json(); // Parseamos la respuesta JSON
            } else {
                // Si hubo un error, lanzar explícitamente una excepción
                // para ser "catcheada" más adelante
                throw new Error('Error al obtener respuesta.');
            }
        })
        // .then(function (data) {
        //     alert('Producto eliminado correctamente.');
            
        // })
        .catch(function (error) {
            // Código para manejar errores
            alert('Error al agregar el producto.');
        });

}