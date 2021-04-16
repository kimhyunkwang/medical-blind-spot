from flask import Blueprint, jsonify, request, session
from flask_restful import reqparse
from app import db
from app.models import Residence, Scrap, User
import pandas as pd
import json

bp = Blueprint('compare', __name__, template_folder='templates', static_folder='static')

@bp.route('/compare2', methods=('GET', 'POST'))
def compare():
    parser = reqparse.RequestParser()
    parser.add_argument('pick_1', type=int)
    parser.add_argument('pick_2', type=int)
    parser.add_argument('pick_3', type=int)
    parser.add_argument('protectorLat')
    parser.add_argument('protectorLng')
    parser.add_argument('hospitalLat')
    parser.add_argument('hospitalLng')
    args = parser.parse_args()

    pick_id_list = [args['pick_1'], args['pick_2'], args['pick_3']]

    if request.method == 'POST':
        if session.get('user_id') is None:
            return jsonify(_status = "success", result = "error")
        else:
            user_id = session['user_id']
            for resid_id in pick_id_list:
                new_scrap = Scrap(user_id = user_id, residence_id = resid_id)
                db.session.add(new_scrap)
            
            user = User.query.filter(User.id == user_id).first()
            user.protectorLat = args['protectorLat']
            user.protectorLng = args['protectorLng']
            user.hospitalLat = args['hospitalLat']
            user.hospitalLng = args['hospitalLng']
            db.session.commit()
            return jsonify(_status = "success", result = "success")

    pick_resid_list = Residence.query.filter(Residence.id.in_(pick_id_list))

    result_df = pd.read_sql(pick_resid_list.statement, pick_resid_list.session.bind)
    result = json.loads(result_df.to_json(orient='records'))

    return jsonify(_status = "success", result = result)

