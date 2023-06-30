from .entities.user import User


class ModelUser():

    @classmethod
    def login(self, db, usuario, password):
        try:
            cursor = db.connection.cursor()
            sql= """SELECT * FROM usuarios WHERE username = '{}'""".format(usuario)
            cursor.execute(sql)
            row=cursor.fetchone()        

            if row != None:
                user=User(row[0], row[1], User.check_password(row[2], password), row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10])  
                return user

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_id(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql= """SELECT * FROM usuarios WHERE id_usuario = '{}'""".format(id)
            cursor.execute(sql)
            row=cursor.fetchone()

            if row != None:
                return User(row[0], row[1], False, row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10])
                
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def sign_up(self, db, user):
        try:
            cursor = db.connection.cursor()
            sql= """INSERT INTO `usuarios`(`id_usuario`, `username`, `password`, `fullname`, `telefono`, `email`, `direccion`, `cp`, `ciudad`, `fecha_creacion`,  `autorizado`) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}')""".format('null', user.username, user.password, user.fullname, user.telefono, user.email, user.direccion, user.cp, user.ciudad, user.fecha_creacion, user.autorizado)
            cursor.execute(sql)
            db.connection.commit()
            db.connection.close()
                
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_username(self, db, user):
        try:
            cursor = db.connection.cursor()
            sql= """SELECT username FROM usuarios WHERE username = '{}'""".format(user.username)
            cursor.execute(sql)
            row=cursor.fetchone()
         
            if row != None:
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_email(self, db, user):
        try:
            cursor = db.connection.cursor()
            sql= """SELECT email FROM usuarios WHERE email = '{}'""".format(user.email)
            cursor.execute(sql)
            row=cursor.fetchone()
         
            if row != None:
                return True
            else:
                return False
        except Exception as ex:
            raise Exception(ex)