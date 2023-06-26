from flask_login import UserMixin

class User(UserMixin):

    def __init__(self, id, autorizado,  username, password, nombre= '', apellido='', email='',  fecha_creacion='', fecha_actualizacion='') -> None:
        self.id = id
        self.autorizado = autorizado
        self.username = username
        self.password = password
        self.nombre = nombre
        self.apellido = apellido
        self.email = email
        self.fecha_creacion = fecha_creacion
        self.fecha_actualizacion = fecha_actualizacion
        
    
    @classmethod
    def check_password(self, db_password, password):
        if db_password==password:
            return True
        else:
            return False
    