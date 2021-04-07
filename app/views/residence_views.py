from flask import Blueprint, request, render_template

bp = Blueprint('residence', __name__, template_folder='templates', static_folder='static')

@bp.route('/residence', methods=('GET', 'POST'))
def hospital():
    if request.method == 'POST':
        return jsonify(status = "success")

    return render_template('residence.html')