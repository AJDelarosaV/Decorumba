


class ItemCarrito:
    def __init__(self, cod, nombre, cantidad, precio, cod_user) -> None:
        self.cod = cod
        self.nombre= nombre
        self.cantidad= cantidad
        self.precio= precio
        self.cod_user= cod_user

    @classmethod
    def consulta_carrito(self, db, cod):
        cursor= db.connection.cursor()
        sql= f"SELECT * FROM carrito WHERE id= {cod}"
        cursor.execute(sql)
        row= cursor.fetchone()
        
        if row is not None:
            return ItemCarrito(row[0], row[1], row[2], row[3],row[4])
        else:
            return None




    



