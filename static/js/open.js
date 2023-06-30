///////////////////////////////////////
//////AGREGAMOS FUNCION AL HACER CLICK EN EL PRODUCTO PARA ABRIR SU DESCRIPCION///////////
////////////////////////////////////////

var contProducto = document.getElementsByClassName('producto');
for (var i = 0; i < contProducto.length; i++) {
    var boxProducto = contProducto[i];
    boxProducto.addEventListener('dblclick', ()=> alert("En Construcción!!!"));
}


///////////////////////////////////////
//////PROXIMAMENTE///////////
////////////////////////////////////////

function callProductos(){
    const url = 'http://127.0.0.1:5000/carrito';
     
    fetch(url)
            .then(data => {
                return data.json();
            })
            .then(dataJSON => {
                if (dataJSON.cod === '404') {
                    console.log('Ciudad no encontrada...');
                } else {
                    
                    console.log(dataJSON);
                }
                //console.log(dataJSON);
            })
            .catch(error => {
                console.log(error);
            })
    }

callProductos();