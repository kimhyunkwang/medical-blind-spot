import csv
import pandas as pd

from app import db, create_app
from app.models import Hospital

session = db.session
app = create_app()

with app.app_context():
    data = pd.read_excel('data/hospi4.xlsx')

    # 필요한 열만 추출
    df_7cols = data[["dutyName", "dutyDivNam", "dutyEmclsName", "dutyEryn", "dutyAddr", "wgs84Lon", "wgs84Lat"]]

    # 우편번호 전처리
    postCdn = data[["postCdn1", "postCdn2"]]
    postCdn = postCdn.astype("str")

    postCdnList1 = list(n_str[:-2] for n_str in postCdn["postCdn1"])
    postCdn["postCdn1"] = pd.DataFrame(postCdnList1)
    postCdnList2 = list(n_str[:-2] for n_str in postCdn["postCdn2"])
    postCdn["postCdn2"] = pd.DataFrame(postCdnList2)

    postCdn["postCdn"] = postCdn["postCdn1"] + postCdn["postCdn2"]
    postCdn = postCdn.drop(["postCdn1", "postCdn2"], axis = 1)

    # df_7cols 데이터프레임과 우편번호 데이터프레임 병합
    df_8cols = pd.concat([df_7cols, postCdn], axis = 1)

    # null 값 처리
    df_8cols.loc[df_8cols.wgs84Lat.isna(), 'wgs84Lat'] = -1
    df_8cols.loc[df_8cols.wgs84Lon.isna(), 'wgs84Lon'] = -1
    df_8cols.loc[df_8cols.postCdn == 'nn', 'postCdn'] = -1

    db.session.bulk_insert_mappings(Hospital, df_8cols.to_dict(orient="records"))

    db.session.commit()
