class Config:
    SECRET_KEY= '324BBE3A5C'



class DevelopmentConfig(Config):
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'decorumbas'

config = {
    'development':DevelopmentConfig
}