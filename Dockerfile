FROM python:3

COPY . .

RUN apt-get update
RUN pip install -r requirement.txt

EXPOSE 5000

CMD ["python", "app.py"]