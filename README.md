# 안심 바운더리 추천 서비스
## 디렉토리 구조
```
data-project                # root
├─ app
|   ├─ static                       # css, js, image
|   ├─ templates                    # html files
|   ├─ views
|   |   ├─ auth_views.py             # 회원가입, 로그인 view
|   |   ├─ compare_views.py          # 후보 매물 비교 view
|   |   ├─ hospital_views.py         # 병원 지도 view
|   |   ├─ index_views.py            # 인덱스 view
|   |   ├─ mypage_views.py           # 마이페이지 view
|   |   └─ residence_views.py        # 매물 검색 view
|   ├─ __init__.py
|   ├─ forms.py
|   └─ models.py                    # Data Model 정의
├─ data                             # 데이터
├─ dataonly                         
|   └─ Dockerfile                   # 데이터 전용 컨테이너 도커파일
├─ nginx                            
|   └─ Dockerfile                   # nginx 컨테이너 도커파일
├─ .gitignore
├─ docker-compose.yml               # docker-compose 파일
├─ Dockerfile                       # flask 컨테이너 도커파일
├─ load_data.py                 # 초기 데이터 로드 파일
├─ README.md
├─ requirements.txt
├─ run.py                       # app 실행 파일
└─ wsgi.py                      
```


## 프로젝트 설치 및 실행 방법
### 설치
```bash
# clone the project repository
git clone https://kdt-gitlab.elice.io/001-part3-project-MedicalBlindSpot/team5/data-project.git
```

### 가상 환경 구축
```bash
# 가상 환경 폴더 생성
python -m venv python-env
# 가상 환경 접속
source python-env/bin/activate
# 패키지 설치
pip install -r requirements.txt
```

### 데이터베이스 설정
```bash
# library/config.py 생성하고 아래 내용 작성
# 실제 정보를 <>, []에 기입해주세요.

SQLALCHEMY_DATABASE_URI = "mysql+pymysql://<username>:<password>@<hostname>:3306/<database_name>?charset=utf8mb4"
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = [secret_key]
```

### 마이그레이션 및 데이터 초기화
```bash
# migrations directory 생성
flask db init
flask db migrate
flask db upgrade

# 초기 데이터 로드
python load_data.py
```

### 실행
```bash
python run.py
```


## 1. 프로젝트 소개

**어떠한 데이터셋와 도구 및 기술을 사용했는지에 대한 설명과 엔드유저에게 보이는 웹서비스에 대한 소개**

### 사용한 데이터 ###

- [시도별_연령별_성별_적용인구_현황_의료급여.csv](uploads/47c4cacb78cde2a9d7b294fc7fd05e62/시도별_연령별_성별_적용인구_현황_의료급여.csv)
- [연령_및_성별_인구__시군구.csv](uploads/df9b09e6bff02f17befa7b7bba76f491/연령_및_성별_인구__시군구.csv)
- [행정구역_시군구_별__성별_인구수_20210331235149.xlsx](uploads/352b6234c68ec90dc99d2cce4e4dc7e7/행정구역_시군구_별__성별_인구수_20210331235149.xlsx)
- [1인당_개인소득_시도__20210401152737.csv](uploads/b967099cad570b2b1e88f151f973b714/1인당_개인소득_시도__20210401152737.csv)
- [시.군별__주요__경제지표__현황__비교__1_.xlsx](uploads/aaa8ae4ba2749f328878a9dcc9454d2f/시.군별__주요__경제지표__현황__비교__1_.xlsx)
- [시_도별_등급별_자격별_주요질병_및_증상_현황_20210308190131__6_.xlsx](uploads/c3008ba7b734e387e6046fa6b54b341d/시_도별_등급별_자격별_주요질병_및_증상_현황_20210308190131__6_.xlsx)
- [아파트실거래가.xlsx](uploads/fdd3d16e1e45c9c15622189121299ac2/apartment_price3.xlsx)
- 병원세부사항(위치, 요일별 진료시간,,,) (용량이 커서 제출 불가)
- 전국아파트매물 (용량이 커서 제출 불가)
- 전국오피스텔매물 (용량이 커서 제출 불가)
- [부모부양_견해_통계.csv](uploads/c7a0df01102df6c31f8cb51b82307cb0/부모부양_견해_통계.csv)
- [인구_천명당_의료기관_종사_의사수_시도_시_군_구__20210317181120__2_.xlsx](uploads/f482a7954f8c5888978b23db447521c0/인구_천명당_의료기관_종사_의사수_시도_시_군_구__20210317181120__2_.xlsx)
- [국민기초생활보장_수급자수_시도__20210401153516.csv](uploads/78202adcf0584b767ed2bcb30e8e755d/국민기초생활보장_수급자수_시도__20210401153516.csv)
- [치료가능사망자수](uploads/2559e8475e804e940f7d3a9cba182770/trp.csv)


 
### 기술 스택 ###
- python, jupyter, vs code
- javascript, html, css, node js
- MySql, docker, azure vm, ubuntu, Flask, SQLAlchemy
<br>

### 사용한 openAPI ###
- kakaomap API , navermap API, googlemap API, 전국_병의원찾기_API, 국토교통부_아파트_실거래가 open API, 
<br>

### 사용된 라이브러리 ###
- jQuery, numpy, pandas, xmltodict, matplotlib, seaborn, urllib, bs4, requests, json, openpyxl
<br>
<br>

## 2. 프로젝트 목표     


### 프로젝트 아이디어 동기 ###
나이가 들수록 부양 가족이 줄어드는 데이터와 지역별 의료 인력과 병원 수의 차이로 인한 의료 사각지대가 존재한다고 생각했습니다. 결정적으로 중증 질환 데이터를 보고 독거노인들의 의료 사각지대 문제가 심각하다는 사실을 알게되어 이번 웹 서비스 프로젝트 주제를 생각하게 되었습니다.    
<br>
<br>
### 문제를 해결하기 위한 특정 질문 명시 ###
- 지역별 의료 인력과 병원 수의 차이로 인한 의료 사각지대가 존재하는가?
- 혼자 사는 어른신 집 근처에 병원이 없으면 생존률에 영향을 미치지 않을까?
- 가족이 근처에 없으면 질병 관리가 어렵지 않을까?
- 시도별로 의료 수준이 다르지 않을까?
- 가족이 멀리 살수록 고립되는 독거노인이 늘어나지 않을까?
- 노후에 살 집을 쉽게 알아볼 수 없을까?     
<br>
<br>   

### 데이터를 통해 탐색하려는 문제를 구체적으로 작성 ###
<br>
데이터를 통해 첫번째로 어떤 연령 층이 가장 많이 의료 사각지대에 놓여져 있는지 파악하고자 했습니다. 
<br>
두번째로는 지리적 특성과 경제적인 수준 때문에 의료 수준의 차이가 나고 이것이 의료 사각지대를 만드는 하나의 원인이라고 생각했습니다.
<br> 
이를 토대로 저희 웹 서비스 프로젝트 사용 타겟을 설정하고, 웹 서비스를 통해 의료 사각지대에 놓인 사람들에게 조금이나마 특수한 환경 때문에 놓인 의료 사각지대를 해소하는 데에 도움이 되는 서비스를 만들고자 했습니다.
<br>
<br>   

## 3. 프로젝트 기능 설명 ##
<br>

### 주요 기능 ###   
<br>
- 안심 바운더리 표시 기능: 이사를 계획 중인 노인 혹은 그의 보호자를 대상으로, 보호자와 의료 시설 위치를 기반으로 한 안심 바운더리를 보여 줄 것입니다.
- 매물 데이터 표시 기능: 안심 바운더리 내에서 원하는 조건에 맞는 매물 데이터를 필터링해서 보여줄 것입니다.
- 후보 거주지 시각화 기능: 사용자가 지정한 거주지 후보들을 비교하기 쉽도록 조건별로 요약, 비교하여 보여줄 것입니다. 
<br>
<br>   

### 서브 기능 ###   
  
<br>
- 병원 지도 기능: 위치를 입력하면 병원 데이터들을 지도상에 나타내준다.
- 후보 거주지 저장 기능: 로그인 한 회원에 한하여, 마이 페이지에 후보 거주지를 저장할 수 있게끔 할 것입니다.
<br>
  
### 차별점 ###    
  
<br>
전국의 병의원 위치와 수를 나타내주는 지도는 이미 존재하고 있으나, 해당 사이트에서 부동산 매물을 볼 수는 없어 이로인한 차별점이 지역적으로 의료 사각지대에 놓인 사람들이 새로운 집을 찾을 때 겪을 수 있는 문제를 조금이나마 해결해 줄 수 있을 것이라는 기대를 할 수 있습니다.
<br>
<br>   

### 기대 효과 ###     
 
<br>
부동산 관련 정보를 손쉽게 얻을 수 있어, 돌봄과 경제활동으로 인해 시간이 부족해 집을 알아보기 어려운 사람들에게 간편한 방식으로 유익한 정보를 줄 수 있다고 판단될 것입니다.
<br>
<br>   

## 4. 프로젝트 구성도     
 
<br>
[스토리보드](https://ovenapp.io/view/rOBhCtiiOc9qU2OcCVkSuS7YGTAcC5Cj/Ys60d)
<br>
<br>   

## 5. 프로젝트 팀원 역할 분담    
  


<br>




| 이름 | 담당 업무 |
| ------ | ------ |
| 강경림 | 백엔드 개발/데이터 분석 |
| 김나윤 | 프론트엔드 개발/데이터 분석 |
| 김현광 | 백엔드 개발/데이터 분석 |
| 손상준 | 리더/데이터 분석 |
<br>
<br>


**멤버별 responsibility(R&R, Role and Responsibilities)**

손상준 <br>

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비
<br>

김나윤, 강경림 <br> 

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집
- 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 프론트 디자인 수정
<br>

김현광, 강경림, 손상준, 김나윤  

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정단계: 코치님 피드백 반영해서 db 관리 및 서버 구축 보완
<br>
<br>   

## 6. 버전   
<br>
  - 프로젝트의 버전 기입
<br>
<br>   

## 7. FAQ   
<br>   

  ```
     Q1. 회원 가입을 하지 않고도 사용이 가능한가요?

     A1. 저희 서비스는 회원 가입 기능이 있지만, 없어도 이용하실 수 있습니다.    
     
     Q2. 주 사용 고객층은 누구인가요?
 
     A2. 집을 구하고자 하시는 모든 고객들이 대상이 될 수 있습니다.
     
     Q3. 집을 보고자하면 지도에서는 어떤 데이터를 보여주시나요?
     
     A3. 현재는 아파트 매물 데이터를 보여드리고 있습니다. 
  ```
