


class ModelCarrito:

    @classmethod
    def modificar(self, db, itemcarrito, item, cantidad):
        if cantidad > 0:
            if item.stock >= 1:
                cursor= db.cursor()
                sql= f"UPDATE carrito SET cantidad= cantidad + {cantidad} WHERE id= {itemcarrito.cod}"
                cursor.execute(sql)
                db.commit()

                sql= f"UPDATE productos SET stock= stock - {cantidad} WHERE cod= {itemcarrito.cod}"
                cursor.execute(sql)
                db.commit()
                cursor.close()
                return True
            else:
                return False
        else:
            if itemcarrito.cantidad > 1:
                cursor= db.cursor()
                sql= f"UPDATE carrito SET cantidad= cantidad + {cantidad} WHERE id= {itemcarrito.cod}"
                cursor.execute(sql)
                db.commit()

                sql= f"UPDATE productos SET stock= stock - {cantidad} WHERE cod= {itemcarrito.cod}"
                cursor.execute(sql)
                db.commit()
                cursor.close()
                return True
            elif itemcarrito.cantidad==1:
                cursor= db.cursor()
                sql= f"DELETE FROM carrito WHERE id= {itemcarrito.cod}"
                cursor.execute(sql)
                db.commit()

                sql= f"UPDATE productos SET stock= stock - {cantidad} WHERE cod= {itemcarrito.cod}"
                cursor.execute(sql)
                db.commit()
                cursor.close()
                return True
            

    @classmethod
    def agregar(self, db, item):

        if item.stock >= 1:
            cursor= db.cursor()
            sql= "INSERT INTO carrito (id, nombre_item, cantidad, precio, imagenSrc, cod_usuario) VALUES (%s, %s, %s, %s, %s, %s)"
            data =(item.cod, item.nombre, 1, item.precio, item.src, 0)
            cursor.execute(sql, data)
            db.commit()

            sql= "UPDATE productos SET stock= stock - 1 WHERE cod= %s"
            data =(item.cod,)
            cursor.execute(sql, data)
            db.commit()
            cursor.close()
            return True

        else:
            return False

        
    
    @classmethod
    def eliminar(self, db, item):
        try:
            
            cursor= db.cursor()
            sql= "DELETE FROM carrito WHERE id= %s"
            data= (item.cod,)
            cursor.execute(sql, data)
            db.commit()

            sql= "UPDATE productos SET stock= stock + %s WHERE cod= %s"
            data2 =(item.cantidad, item.cod)
            cursor.execute(sql, data2)
            db.commit()
            cursor.close()  
            return True
        
        except Exception as ex:
            raise Exception(ex)



