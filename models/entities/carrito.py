# from models.ModelsItems import ModelItems
# from entities.item import Item
# from flask import jsonify

# class ItemCarrito:
#     def __init__(self, cod, nombre, cantidad, precio, cod_user) -> None:
#         self.cod = cod
#         self.nombre= nombre
#         self.cantidad= cantidad
#         self.precio= precio
#         self.cod_user= cod_user


# class Carrito:
#     def __init__(self) -> None:
        
#         self.items= []


#     @classmethod
#     def agregar(self, cod, cod_user, cantidad, item, db):

#         try:
#             producto= ModelItems.check_producto_db(db, cod)

#             if producto is None:
#                 return jsonify({'message': 'El producto no existe.'}), 404

#             if producto.stock < cantidad:
#                 return jsonify({'message': 'Cantidad en stock insuficiente.'}), 400

#             for item in self.items:
#                 if item.cod == cod:
#                     item.cantidad += cantidad
#                     # self.cursor.execute("UPDATE productos SET stock = stock - ? WHERE cod = ?", (cantidad, cod))
#                     # self.conexion.commit()
#                     return jsonify({'message': 'Producto agregado al carrito correctamente.'}), 200

#             nuevo_item = ItemCarrito(cod, producto.nombre, cantidad, producto.precio, cod_user)
#             # self.items.append(nuevo_item)
#             # self.cursor.execute("UPDATE productos SET cantidad = cantidad - ? WHERE codigo = ?",
#             #                 (cantidad, cod))
#             # self.conexion.commit()
#             return jsonify({'message': 'Producto agregado al carrito correctamente.'}), 200

#         except Exception as ex:
#             raise Exception(ex)

#     @classmethod
#     def quitar(self, cod, cantidad, item):
#             for item in self.items:
#                 if item.cod == cod:
#                     if cantidad > item.cantidad:
#                         return jsonify({'message': 'Cantidad a quitar mayor a la cantidad en el carrito.'}), 400
#                     item.cantidad -= cantidad
#                     # if item.cantidad == 0:
#                     #     self.items.remove(item)
#                     # self.cursor.execute("UPDATE productos SET cantidad = cantidad + ? WHERE codigo = ?",
#                     #                     (cantidad, codigo))
#                     # self.conexion.commit()
#                     return jsonify({'message': 'Producto quitado del carrito correctamente.'}), 200

#             return jsonify({'message': 'El producto no se encuentra en el carrito.'}), 404



