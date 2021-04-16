from flask import Blueprint, jsonify
from flask_restful import reqparse
from app.models import Residence, Scrap
from sqlalchemy.sql import func
import pandas as pd
import json

bp = Blueprint('compare', __name__, template_folder='templates', static_folder='static')

@bp.route('/api/compare', methods=('GET', 'POST'))
def compare():
    parser = reqparse.RequestParser()
    parser.add_argument('pick_1', type=int)
    parser.add_argument('pick_2', type=int)
    parser.add_argument('pick_3', type=int)
    args = parser.parse_args()

    pick_id_list = [args['pick_1'], args['pick_2'], args['pick_3']]

    if request.method == 'POST':
        if session.get('user_id') is None:
            flash("로그인이 필요한 서비스입니다.")
            return jsonify(_status = "error")
        else:
            user_id = session['user_id']
            for resid_id in pick_id_list:
                new_scrap = Scrap(user_id = user_id, residence_id = resid_id)
                db.session.add(new_scrap)
            db.session.commit()
            return jsonify(_status = "success")

    pick_id_list = [1, 2, 3]
    pick_resid_list = Residence.query.filter(Residence.id.in_(pick_id_list))

    result_df = pd.read_sql(pick_resid_list.statement, pick_resid_list.session.bind)
    result = json.loads(result_df.to_json(orient='records'))

    return jsonify(_status = "success", result = result)
