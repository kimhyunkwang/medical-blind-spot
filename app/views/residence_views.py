from flask import Blueprint, jsonify
from flask_restful import reqparse
from app.models import Residence
from sqlalchemy.sql import func
import pandas as pd
import json

bp = Blueprint('residence', __name__, template_folder='templates', static_folder='static')

@bp.route('/api/residence')
def residence():
    parser = reqparse.RequestParser()
    parser.add_argument('protectorLat', type=float)
    parser.add_argument('protectorLng', type=float)
    parser.add_argument('hospitalLat', type=float)
    parser.add_argument('hospitalLng', type=float)
    args = parser.parse_args()
    
    center_lat = (args['protectorLat'] + args['hospitalLat']) / 2
    center_lon = (args['protectorLng'] + args['hospitalLng']) / 2
    # center_loca = (center_lat, center_lon)

    residence_list = Residence.query.\
        filter(func.acos(func.sin(func.radians(center_lat)) * func.sin(func.radians(Residence.latitude)) + func.cos(func.radians(center_lat)) * func.cos(func.radians(Residence.latitude)) * func.cos(func.radians(Residence.longitude) - (func.radians(center_lon)))) * 6371 <= 3)

    result_df = pd.read_sql(residence_list.statement, residence_list.session.bind)
    result = json.loads(result_df.to_json(orient='records'))

    return jsonify(_status = "success", result = result)
