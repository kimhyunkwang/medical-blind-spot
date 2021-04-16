from flask import Blueprint, jsonify
from flask_restful import reqparse
from app.models import Residence
from sqlalchemy.sql import func
import pandas as pd
import json

bp = Blueprint('mypage', __name__, template_folder='templates', static_folder='static')

@bp.route('/api/mypage')
def mypage():
    parser = reqparse.RequestParser()
    parser.add_argument('pick_1', type=int)
    parser.add_argument('pick_2', type=int)
    parser.add_argument('pick_3', type=int)
    args = parser.parse_args()

    pick_id_list = [args['pick_1'], args['pick_2'], args['pick_3']]

    pick_resid_list = Residence.query.filter(Residence.id.in_(pick_id_list))

    result_df = pd.read_sql(pick_resid_list.statement, pick_resid_list.session.bind)
    result = json.loads(result_df.to_json(orient='records'))

    return jsonify(_status = "success", result = result)

