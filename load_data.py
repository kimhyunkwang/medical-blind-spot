import pandas as pd

from app import db, create_app
from app.models import Hospital, Residence

session = db.session
app = create_app()

with app.app_context():
    # 병원 데이터
    hosp_data = pd.read_excel('data/hospi4.xlsx')

    ## 필요한 열만 추출
    hosp_df = hosp_data[["dutyName", "dutyDivNam", "dutyEmclsName", "dutyEryn", "dutyAddr", "wgs84Lon", "wgs84Lat"]]

    ## 우편번호 전처리
    postCdn = hosp_data[["postCdn1", "postCdn2"]]
    postCdn = postCdn.astype("str")

    postCdnList1 = list(n_str[:-2] for n_str in postCdn["postCdn1"])
    postCdn["postCdn1"] = pd.DataFrame(postCdnList1)
    postCdnList2 = list(n_str[:-2] for n_str in postCdn["postCdn2"])
    postCdn["postCdn2"] = pd.DataFrame(postCdnList2)

    postCdn["postCdn"] = postCdn["postCdn1"] + postCdn["postCdn2"]
    postCdn = postCdn.drop(["postCdn1", "postCdn2"], axis = 1)

    ## hosp_df 데이터프레임과 우편번호 데이터프레임 병합
    hosp_df = pd.concat([hosp_df, postCdn], axis = 1)

    ## null 값 처리
    hosp_df.loc[hosp_df.wgs84Lat.isna(), 'wgs84Lat'] = -1
    hosp_df.loc[hosp_df.wgs84Lon.isna(), 'wgs84Lon'] = -1
    hosp_df.loc[hosp_df.postCdn == 'nn', 'postCdn'] = -1

    db.session.bulk_insert_mappings(Hospital, hosp_df.to_dict(orient="records"))


    # 부동산 데이터
    apart_data = pd.read_excel('data/아파트매물(위경도포함).xlsx')
    officetel_data = pd.read_excel('data/오피스텔매물(위경도포함).xlsx')

    ## 데이터 합치기
    resid_df = pd.concat([apart_data, officetel_data], axis = 0)

    ## 필요한 열만 추출 & 컬럼명 변경
    resid_df = resid_df[["검색지역", "단지명", "빌딩타입", "최소면적", "최대면적",
                        "최소매매가", "최대매매가", "최소전세가", "최대전세가", "위도", "경도"]]
    resid_df = resid_df.rename(columns = {"검색지역":"residAddr", "단지명":"residName", "빌딩타입":"residType",
                                        "최소면적":"minArea", "최대면적":"maxArea", "최소매매가":"minSalePrice",
                                        "최대매매가":"maxSalePrice", "최소전세가":"minJeonsePrice",
                                        "최대전세가":"maxJeonsePrice", "위도":"latitude", "경도":"longitude"})
    
    ## 가격 전처리
    resid_df["minSalePrice"] = resid_df["minSalePrice"].map(lambda x : x.replace('억','').replace(',', '').replace(' ', ''), na_action='ignore')
    resid_df["minSalePrice"] = resid_df["minSalePrice"].astype('float')
    resid_df["maxSalePrice"] = resid_df["maxSalePrice"].map(lambda x : x.replace('억','').replace(',', '').replace(' ', ''), na_action='ignore')
    resid_df["maxSalePrice"] = resid_df["maxSalePrice"].astype('float')
    resid_df["minJeonsePrice"] = resid_df["minJeonsePrice"].map(lambda x : x.replace('억','').replace(',', '').replace(' ', ''), na_action='ignore')
    resid_df["minJeonsePrice"] = resid_df["minJeonsePrice"].astype('float')
    resid_df["maxJeonsePrice"] = resid_df["maxJeonsePrice"].map(lambda x : x.replace('억','').replace(',', '').replace(' ', ''), na_action='ignore')
    resid_df["maxJeonsePrice"] = resid_df["maxJeonsePrice"].astype('float')

    def division(x):
        if x > 1000:
            return x / 10000
        return x

    resid_df["minSalePrice"] = resid_df["minSalePrice"].apply(division)
    resid_df["maxSalePrice"] = resid_df["maxSalePrice"].apply(division)
    resid_df["minJeonsePrice"] = resid_df["minJeonsePrice"].apply(division)
    resid_df["maxJeonsePrice"] = resid_df["maxJeonsePrice"].apply(division)

    ## null 값 처리
    resid_df.loc[resid_df.minArea.isna(), 'minArea'] = -1
    resid_df.loc[resid_df.maxArea.isna(), 'maxArea'] = -1
    resid_df.loc[resid_df.minSalePrice.isna(), 'minSalePrice'] = -1
    resid_df.loc[resid_df.maxSalePrice.isna(), 'maxSalePrice'] = -1
    resid_df.loc[resid_df.minJeonsePrice.isna(), 'minJeonsePrice'] = -1
    resid_df.loc[resid_df.maxJeonsePrice.isna(), 'maxJeonsePrice'] = -1
    resid_df.loc[resid_df.latitude.isna(), 'latitude'] = -1
    resid_df.loc[resid_df.longitude.isna(), 'longitude'] = -1

    db.session.bulk_insert_mappings(Residence, resid_df.to_dict(orient="records"))

    db.session.commit()
