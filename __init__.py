from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

socketio = SocketIO()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')
    socketio.init_app(app)
    CORS(app)
    with app.app_context():
        from views import views
        app.register_blueprint(views, url_prefix='/')       
        return app, socketio
