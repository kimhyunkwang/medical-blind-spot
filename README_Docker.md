1. 데이터 전용 컨테이너 가동 : 데이터 전용 컨테이너를 따로 만들어서 관리합니다.

```
cd project/data-project/dataonly

docker build -t dataonly .

docker run -itd --name dataonly dataonly
```

2. docker-compose 실행 : docker-compose build를 통해 프로젝트 실행 및 배포에 필요한 mysql, flask, nginx 컨테이너를 실행시킵니다.

```
cd project/data-project

docker-compose up --build
```

3. db 구축
```
docker exec -i -t data-project_flask_1 bash

flask db init

flask db migrate

flask db upgrade

python load_data.py
```

+ 기타 도커 명령어
```
docker ps

docker rm -f `docker ps -a -q`

docker rmi `docker images -q`
```
- mysql 컨테이너 들어가기
```
docker exec -i -t mysql-db bash

mysql -u root -p

use medical_blind_spot
```
