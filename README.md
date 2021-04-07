# 안심 바운더리 추천 서비스
## 디렉토리 구조
```
data-project                # root
├─ launcher
|   ├─ static                       # css, js, image
|   ├─ templates                    # html files
|   ├─ views
|   |   ├─ index_views.py               # 인덱스 view
|   |   ├─ hospital_views.py            # 병원 추천 view
|   |   └─ residence_views.py           # 거주지 추천 view
|   ├─ __init__.py
|   └─ models.py                    # Data Model 정의
├─ data
|   └─ hospi4.csv                   # 초기 데이터
├─ venv                         # python 가상 환경
├─ .gitignore
├─ config.py
├─ load_data.py                 # 초기 데이터 로드 파일
├─ README.md
├─ requirements.txt
└─ run.py                       # app 실행 파일
```
