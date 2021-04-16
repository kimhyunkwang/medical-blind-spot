from flask import Blueprint, jsonify, session
from app.models import Residence, Scrap
import pandas as pd
import json

bp = Blueprint('mypage', __name__, template_folder='templates', static_folder='static')

@bp.route('/mypage2')
def mypage():
    if session.get('user_id') is None:
        return jsonify(_status = "success", result = "error")

    pick_list = Scrap.query.filter(Scrap.user_id == session['user_id']).all()

    pick_resid_id = []
    for pick in pick_list:
        pick_resid_id.append(pick.residence_id)
    
    pick_resid_list = Residence.query.filter(Residence.id.in_(pick_resid_id))

    result_df = pd.read_sql(pick_resid_list.statement, pick_resid_list.session.bind)
    result = json.loads(result_df.to_json(orient='records'))

    return jsonify(_status = "success", result = result)
