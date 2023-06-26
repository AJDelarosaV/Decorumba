

class Item:

        def __init__(self, cod, nombre, descripcion, precio, src, stock, id_categoria = 1, id_marca = 1, id_tamanio = 1, activo = True) -> None:
                self.cod = cod
                self.nombre = nombre
                self.descripcion = descripcion
                self.precio = precio
                self.src = src
                self.stock = stock
                self.id_categoria = id_categoria
                self.id_marca = id_marca
                self.id_tamanio = id_tamanio
                self.activo = activo
        
        
