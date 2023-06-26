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