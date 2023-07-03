from flask import Flask, render_template, request, redirect, url_for, flash,jsonify, json
from flask_mysqldb import MySQL
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from datetime import datetime
from flask_cors import CORS


from config import config

#Models
from models.ModelsUser import ModelUser
from models.ModelsItems import ModelItems
from models.ModelsCarrito import ModelCarrito

#Entities
from models.entities.user import User
from models.entities.item import Item
from models.entities.carrito import ItemCarrito



# .\env\Scripts\activate


app = Flask(__name__)
CORS(app)
db = MySQL(app)
login_manager_app= LoginManager(app)

"""
###########################################################
CONFIGURACION DE RUTAS PARA PAGINA PRINCIPAL
###########################################################
"""
@login_manager_app.user_loader
def load_user(id):
    return ModelUser.get_by_id(db, id)

@app.route('/', methods = ['GET', 'POST'])
def index():

    productos  = ModelItems.lista_de_productos(db)

    return render_template('index.html', items = productos)

"""
###########################################################
CONFIGURACION DE RUTAS PARA INICIO DE SESION DE USUARIO
###########################################################
"""
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method=='POST':

        usuario = request.form['user_email']
        password = request.form['user_password']
        logged_user = ModelUser.login(db, usuario, password)
        
        if logged_user != None:
            if logged_user.password:
                login_user(logged_user)
                return redirect(url_for('index'))
            else:
                flash('Password Invalido...')
            return render_template('auth/login.html')
        else:
            flash('Usuarios No Encontrado...')
            return render_template('auth/login.html')     
    else:
        return render_template('auth/login.html')       

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

"""
###########################################################
CONFIGURACION DE RUTAS PARA LOS REGISTRO DE USUARIO
###########################################################
"""
@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method=='POST':  #    
        #COMPROBACION PARA SABER SI ESTA AUTORIZADO
        Admin = 'AdMin_' #Variable con la palabra que hace al usuario AUTORIZADO
        userName = request.form['usuario']
        indice = userName.find(Admin)

        if not indice>= 0:
            usuario_check = request.form['usuario']
            isAutorizado = 0
        else:
            usuario_check = userName[0: indice] + userName[indice + len(Admin):].strip()
            isAutorizado = 1

        usuario = User('null', usuario_check, request.form['password2'], request.form['fullname'], request.form['telefono'], request.form['correo'], request.form['direccion'], request.form['codigo_postal'], request.form['ciudad'], datetime.today().strftime("%Y-%m-%d"), isAutorizado)
        
        check = ModelUser.get_by_username(db, usuario)
        check2 = ModelUser.get_by_email(db, usuario)
        
        if check or check2:
            flash('Usuario extistene, Inicie Session')
            return  render_template('sign_up/registro.html')

        else:
            ModelUser.sign_up(db, usuario)
            flash('Usuario resgtrado exitosamente')
            
            return  redirect(url_for('login'))
    else:
        return render_template('sign_up/registro.html')

"""
###########################################################
CONFIGURACION DE RUTAS PARA LOS PRODUCTOS
###########################################################
"""
#Ruta para INVENTARIO de productos en la base de datos
@app.route('/inventario')
@login_required
def inventario():
    cursor = db.connection.cursor()
    cursor.execute('SELECT * FROM productos')

    result= cursor.fetchall()
    #Convertir datos en diccionario
    insertObject = []
    columnName = [column[0] for column in cursor.description]
    for record in result:
        insertObject.append(dict(zip(columnName, record)))
    cursor.close()

    return render_template('inventario.html', data=insertObject)

#Ruta para AGREGAR producto en la base de datos
@app.route('/producto', methods=['POST'])
@login_required
def addItem():
       
    item= Item(request.form['codigo'], request.form['nombre'], request.form['descripcion'],request.form['precio'],request.form['stock'],request.form['src'],request.form['categoria'],request.form['marca'],request.form['tamanio'])

    sql = """INSERT INTO productos(cod, nombre, descripcion, precio, stock, src, categoria, marca, tamanio) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    data = (item.cod, item.nombre , item.descripcion, item.precio,  item.stock, item.src, item.categoria, item.marca, item.tamanio)
    cursor = db.connection.cursor()
    cursor.execute(sql, data)
    db.connection.commit()
    cursor.close()
    
    return redirect(url_for('inventario'))

#Ruta para BORRAR producto en la base de datos
@app.route('/borrar/<int:cod>')
@login_required
def borrar(cod):

    cursor = db.connection.cursor()
    sql = f"""DELETE FROM productos WHERE `productos`.`cod` = {cod}"""
    
    cursor.execute(sql)
    db.connection.commit()
   

    return redirect(url_for('inventario'))

#Ruta para MODIFICAR producto en la base de datos
@app.route('/producto/<string:codigo>', methods=['POST'])
@login_required
def modificar(codigo):

    item= Item(codigo, request.form['nombre'], request.form['descripcion'],request.form['precio'],request.form['stock'],request.form['src'],request.form['categoria'],request.form['marca'],request.form['tamanio'])

    sql = """UPDATE productos SET cod=%s, nombre=%s, descripcion=%s, precio=%s, stock=%s, src=%s, categoria=%s, marca=%s, tamanio=%s WHERE cod=%s"""
    data = (item.cod, item.nombre , item.descripcion, item.precio,  item.stock, item.src, item.categoria, item.marca, item.tamanio, codigo)
    cursor = db.connection.cursor()
    cursor.execute(sql, data)
    db.connection.commit()
    cursor.close()
    
    return redirect(url_for('inventario'))

"""
###########################################################
CONFIGURACION DE RUTAS PARA EL CARRITO DE COMPRA
###########################################################
"""
#LISTA DE LOS ITEMS EN EL CARRITO
@app.route('/carrito', methods= ['GET'])
def carrito():
    cursor = db.connection.cursor()
    cursor.execute('SELECT * FROM carrito')
    row = cursor.fetchall()
    carro = []

    for fila in row:
        carrito= {'id': fila[0], 'nombre': fila[1], 'cantidad':fila[2], 'precio':fila[3]}
        carro.append(carrito)

    return jsonify({'carrito': carro, 'mensaje':'Listado de la base de datos carrito'}), 200

#CONSULTA ITEM CARRITO
@app.route('/carrito/<int:cod>', methods= ['GET'])
def consulta_carrito(cod):
    cursor = db.connection.cursor()
    cursor.execute(f'SELECT * FROM carrito WHERE id= {cod}')
    row = cursor.fetchone()

    id_item, nombre, cantidad, precio = row
    carro = {'id': id_item, 'nombre': nombre, 'cantidad': cantidad, 'precio':precio}

    return jsonify({'carrito': carro, 'mensaje':'Consulta realizada con exito', 'status': True}), 200

#AGREGAR  ITEM AL CARRITO
@app.route('/carrito', methods= ['POST'])
def agregar_carrito():
    cod = request.json.get('codigo')
    item = ModelItems.check_producto_db(db, cod)
    if item is not None:
        is_add = ModelCarrito.agregar(db, item)
        
        if is_add:
            return jsonify({'message':'Item agregado al carrito'}), 200
        else:
            return jsonify({'message':'Stock insuficiente para agregar'}), 404


#ELIMINAR PRODUCTO DE LA BASE DE DATOS CARRITO
@app.route('/carrito/<int:cod>', methods= ['DELETE'])
def eliminar_carrito(cod):
    is_carrito= ItemCarrito.consulta_carrito(db, cod)   
    
    if is_carrito is not None:
        is_borrado= ModelCarrito.eliminar(db, is_carrito)
        if is_borrado:
            return jsonify({'messsage':'Se elimino el producto en el carrito'}), 200
        else:
            return jsonify({'message':'El item no existe en el carrito'}), 404
   
#AUMENTAR y  RESTAR CANTIDAD DE ITEM EN CARRITO
@app.route('/carrito/<int:cod>', methods= ['PUT'])
def modificar_cantidad_carrito(cod):
    
    cantidad = request.json.get('cantidad')
    is_carrito= ItemCarrito.consulta_carrito(db, cod)   
    if is_carrito is not None:
        item = ModelItems.check_producto_db(db, cod)
        ModelCarrito.modificar(db, is_carrito, item, cantidad)
        return jsonify({'mensaje':'Se modifico el producto en el carrito'}), 200

        
"""
###########################################################
CONFIGURACION DE RUTAS PARA PAGINA SOBRE NOSOTROS
###########################################################
"""
@app.route('/sobre_nosotros', methods=['GET'])
def sobre_nosotros():
    return render_template('about_us/Sobre_Nosotros.html')






if  __name__ =='__main__':
    app.config.from_object(config['development'])
    app.run()


