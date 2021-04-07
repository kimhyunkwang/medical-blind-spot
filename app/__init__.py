from flask import Flask

def create_app():
    app = Flask(__name__)

    # 블루프린트
    from .views import index_views, residence_views, hospital_views
    app.register_blueprint(index_views.bp)
    app.register_blueprint(residence_views.bp)
    app.register_blueprint(hospital_views.bp)


    return app
