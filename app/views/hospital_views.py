from flask import Blueprint, request, render_template
from app.models import Hospital
import pandas as pd
import json

bp = Blueprint('hospital', __name__, template_folder='templates', static_folder='static')

@bp.route('/hospital', methods=('GET', 'POST'))
def hospital():
    if request.method == 'POST':
        inputed_region1 = request.form.get("region1")
        inputed_hosp_divs = request.form.getlist("hosp_div")

        region1_dict = {
            "1": "서울특별시", "2": "부산광역시", "3": "대구광역시", "4": "인천광역시", "5": "광주광역시",
            "6": "대전광역시", "7": "울산광역시", "8": "세종특별자치시", "9": "경기도", "10": "강원도",
            "11": "충청북도", "12": "충청남도", "13": "전라북도", "14": "전라남도", "15": "경상북도",
            "16": "경상남도", "17": "제주특별자치도"
        }
        keyword1 = f"{region1_dict[inputed_region1]}%"
        
        div_dict = {
            "div1":"한의원", "div2":"한방병원", "div3":"치과의원", "div4":"치과병원",
            "div5":"종합병원", "div6":"요양병원", "div7":"병원", "div8":"의원",
            "div9":"보건소", "div10":"기타(구급차)","div11":"기타"
        }
        keyword2_list = []
        for div in inputed_hosp_divs:
            keyword2_list.append(div_dict[div])

        hospital_list = Hospital.query.\
                                filter(Hospital.dutyAddr.like(keyword1)).\
                                filter(Hospital.dutyDivNam.in_(keyword2_list))

        result_df = pd.read_sql(hospital_list.statement, hospital_list.session.bind)
        result = json.loads(result_df.to_json(orient='records'))

        return render_template('hospital.html', result = result)

    return render_template('hospital.html')