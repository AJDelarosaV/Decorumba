from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from flask_login import LoginManager, login_user, logout_user, login_required
from datetime import datetime


from config import config

#Models
from models.ModelsUser import ModelUser
from models.ModelsItems import ModelItems

#Entities
from models.entities.user import User
from models.entities.item import Item


# .\env\Scripts\activate


app = Flask(__name__)
db = MySQL(app)
login_manager_app= LoginManager(app)

"""
###########################################################
CONFIGURACION DE RUTAS PARA INICIO DE SESION DE USUARIO
###########################################################
"""
@login_manager_app.user_loader
def load_user(id):
    return ModelUser.get_by_id(db, id)

@app.route('/', methods = ['GET', 'POST'])
def index():

    productos  = ModelItems.lista_de_productos(db)


    return render_template('index.html', items = productos) 

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
@app.route('/sign_in', methods=['GET', 'POST'])
def sign_in():
    if request.method=='POST':
        usuario = User(1, request.form['usuario'], request.form['password2'], request.form['nombre'], request.form['nombre'], request.form['correo'], datetime.today().strftime("%Y-%m-%d"))
        
        
        check = ModelUser.get_by_username(db, usuario)
        check2 = ModelUser.get_by_email(db, usuario)
       
            
        
        if check or check2:
            flash('Usuario extistene, Inicie Session')
            return  redirect(url_for('login'))

        else:
            ModelUser.sign_in(db, usuario)
            flash('Usuario resgtrado exitosamente')
            
            return  redirect(url_for('login'))
    else:
        return render_template('sign_in/registro.html')

"""
###########################################################
CONFIGURACION DE RUTAS PARA LOS PRODUCTOS
###########################################################
"""

@app.route('/item', methods=['GET','POST'])
@login_required
def agregar_producto():
    if request.method == 'POST':
        item = Item(request.form['cod'], request.form['nombre'],  request.form['descripcion'], request.form['precio'], request.form['src'], request.form['stock'], request.form['id_categoria'], request.form['id_marca'], request.form['id_tamanio'], request.form['activo'])
        item_agregado = ModelItems.agregar_producto(db, item)
        print(request.form['activo'])
        if item_agregado:
            flash('Producto agregado exitosamente')
            return redirect(url_for('index'))
        else:
            flash('Código de producto ya existe')
            return render_template('item/new_item.html')
            
    else:
            return render_template('item/new_item.html')






if  __name__ =='__main__':
    app.config.from_object(config['development'])
    app.run()


