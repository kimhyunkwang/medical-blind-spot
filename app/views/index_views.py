from flask import Blueprint, render_template

bp = Blueprint('index', __name__, template_folder='templates', static_folder='static')
bp = Blueprint('location', __name__, template_folder='templates', static_folder='static')

@bp.route("/")
def home():
    return render_template("index.html")

@bp.route("/location")
def location():
    return render_template("location.html")

@bp.route("/residence")
def residence():
    return render_template("residence.html")

@bp.route("/compare")
def compare():
    return render_template("compare.html")
