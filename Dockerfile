FROM python:3

COPY . .

RUN apt-get update
RUN pip install -r requirements.txt

EXPOSE 5000