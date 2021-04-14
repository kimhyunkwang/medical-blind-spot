from flask import Blueprint, request, render_template
from app.models import Residence
import pandas as pd
import json

bp = Blueprint('residence', __name__, template_folder='templates', static_folder='static')

@bp.route('/residence', methods=('GET', 'POST'))
def hospital():
    if request.method == 'POST':
        inputed_loca1 = request.form.get("protector")
        inputed_loca2 = request.form.get("facility")
        inputed_max_price = float(request.form.get("max_price")) / 10000
        inputed_min_area = float(request.form.get("min_area"))

        center_lat = (float(inputed_loca1[0]) + float(inputed_loca2[0])) / 2
        center_lon = (float(inputed_loca1[1]) + float(inputed_loca2[1])) / 2
        center_loca = (center_lat, center_lon)

        condition_lat = [center_lat - 0.01, center_lat + 0.01]
        condition_lon = [center_lon - 0.015, center_lon + 0.015]

        price_type_dict = {"매매" : Residence.minSalePrice, "전세" : Residence.minJeonsePrice}
        residence_list = Residence.query.\
                                    filter((Residence.latitude <= condition_lat) & (Residence.longitude <= condition_lon)).\
                                    filter(Residence.residType == "아파트").\
                                    filter((price_type_dict[inputed_price_type] <= inputed_max_price) & (price_type_dict[inputed_price_type] != -1)).\
                                    filter(Residence.maxArea >= inputed_min_area).\
                                    all()

        return render_template('residence.html', result = residence_list)

    return render_template('residence.html')