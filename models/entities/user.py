from flask_login import UserMixin

class User(UserMixin):

    def __init__(self, id, username, password, fullname= '', telefono='', email='', direccion= '', cp= '', ciudad= '', fecha_creacion='', autorizado= 0) -> None:
        self.id = id
        self.username = username
        self.password = password
        self.fullname = fullname
        self.telefono = telefono
        self.email = email
        self.direccion= direccion
        self.cp= cp
        self.ciudad= ciudad
        self.fecha_creacion = fecha_creacion
        self.autorizado= autorizado
        
    
    @classmethod
    def check_password(self, db_password, password):
        if db_password==password:
            return True
        else:
            return False
    