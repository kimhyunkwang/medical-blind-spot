from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pymysql
import config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    # ORM
    db.init_app(app)
    migrate.init_app(app, db)

    # 블루프린트
    from .views import index_views, residence_views, compare_views, mypage_views, hospital_views, auth_views
    app.register_blueprint(index_views.bp)
    app.register_blueprint(residence_views.bp)
    app.register_blueprint(compare_views.bp)
    app.register_blueprint(mypage_views.bp)
    app.register_blueprint(hospital_views.bp)
    app.register_blueprint(auth_views.bp)

    return app