from flask import Blueprint, jsonify, session
from app import db
from app.models import Residence, Scrap, User
import pandas as pd
import json

bp = Blueprint('mypage', __name__, template_folder='templates', static_folder='static')

@bp.route('/api/mypage')
def mypage():
    if session.get('user_id') is None:
        return jsonify(_status = "success", result = "error")

    user_id = session['user_id']
    pick_list = Scrap.query.filter(Scrap.user_id == user_id).all()
    pick_resid_id = []
    for pick in pick_list:
        pick_resid_id.append(pick.residence_id)

    resid_info = Residence.query.filter(Residence.id.in_(pick_resid_id))
    resid_info_df = pd.read_sql(resid_info.statement, resid_info.session.bind)
    resid_result = json.loads(resid_info_df.to_json(orient='records'))

    user = User.query.filter(User.id == user_id).first()
    user_info_dict = {
        "protectorLat" : user.protectorLat, "protectorLng" : user.protectorLng, 
        "hospitalLat" : user.hospitalLat, "hospitalLng" : user.hospitalLng
    }
    user_result = [user_info_dict]

    return jsonify(_status = "success", resid_result = resid_result, user_result = user_result)
