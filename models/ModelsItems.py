from .entities.item import Item

class ModelItems():

    @classmethod
    def agregar_producto(self, db, item):

        try:
            if item is not None:
                check = self.check_producto(db, item.cod)
                if not check:
                    cursor = db.connection.cursor()
                    sql= """INSERT INTO productos (cod, nombre, descripcion,  precio, src, stock, id_categoria, id_marca, id_tamanio, activo) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                    data = (item.cod, item.nombre, item.descripcion, item.precio, item.src, item.stock, item.id_categoria, item.id_marca, item.id_tamanio, item.activo)
                    cursor.execute(sql, data)
                    db.connection.commit()
                    db.connection.close()
                    return True
                else:
                    False
            else:
                return False
        except Exception as ex:
            raise Exception(ex)


    @classmethod
    def lista_de_productos(self, db):
        try:
            cursor = db.connection.cursor()
            sql = "SELECT * FROM productos WHERE stock > 0"
            cursor.execute(sql)
            items = cursor.fetchall()
            
            insertObject = []
            columnNames = [column[0] for column in cursor.description]
            for record in items:
                insertObject.append(dict(zip(columnNames, record)))
            cursor.close()

            return insertObject
        except Exception as ex:
            raise Exception(ex)


    @classmethod
    def check_producto(self, db, cod):
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT cod FROM productos WHERE cod = {cod}"
            cursor.execute(sql)
            item = cursor.fetchone()
            
            if item is not None:
                return True
            else:
                return False

        except Exception as ex:
            raise Exception(ex)