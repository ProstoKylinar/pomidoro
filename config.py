
from os import environ, path

basedir = path.abspath(path.dirname(__file__))


class Config:

    FLASK_APP = 'wsgi.py'
    FLASK_ENV = environ.get('FLASK_ENV') or True
    SECRET_KEY = environ.get('SECRET_KEY') or 'ZADFpvM@RnH5%@KcECduv2RpPCuWh@&&'
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'
    COMPRESSOR_DEBUG = environ.get('COMPRESSOR_DEBUG')
