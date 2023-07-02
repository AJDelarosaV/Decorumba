
class Item:

        def __init__(self, cod='', nombre= '', descripcion= '', precio= 0,  stock = 0, src= '', categoria = 1, marca = 1, tamanio = 1) -> None:
                self.cod = cod
                self.nombre = nombre
                self.descripcion = descripcion
                self.precio = precio
                self.stock = stock
                self.src = src
                self.categoria = categoria
                self.marca = marca
                self.tamanio = tamanio
                
        
        @classmethod 
        def buscar_item(self, db, item):

                sql= "SELECT * FROM productos WHERE cod = {}".format(item)
                cursor = db.connection.cursor()
                cursor.execute(sql)
                row = cursor.fechone()

                if row is not None:
                    return True
                else:
                    return False
