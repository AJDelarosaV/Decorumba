


class ModelCarrito:

    @classmethod
    def aumentar(self, db, itemcarrito, item):
        if item.stock >= 1:
            cursor= db.connection.cursor()
            sql= f"UPDATE carrito SET cantidad= cantidad + 1 WHERE id= {itemcarrito.cod}"
            cursor.execute(sql)
            db.connection.commit()
            cursor.close()
        else:
            return False

        sql= f"UPDATE productos SET stock= stock - 1 WHERE cod= {itemcarrito.cod}"
        cursor.execute(sql)
        db.connection.commit()
        cursor.close()

        return True

    @classmethod
    def agregar(self, db, item):

        if item.stock >= 1:
            cursor= db.connection.cursor()
            sql= "INSERT INTO carrito (id, nombre_item, cantidad, precio, cod_usuario) VALUES (%s, %s, %s, %s, %s)"
            data =(item.cod, item.nombre, 1, item.precio, 0)
            cursor.execute(sql, data)
            db.connection.commit()
        else:
            return False

        sql= "UPDATE productos SET stock= stock - 1 WHERE cod= %s"
        data =(item.cod,)
        cursor.execute(sql, data)
        db.connection.commit()
        cursor.close()

        return True