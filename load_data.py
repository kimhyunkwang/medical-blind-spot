import csv

from app import db, create_app
from app.models import Hospital

session = db.session
app = create_app()

with app.app_context():
    with open('data/hospitals.csv', 'r', encoding='UTF8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            hospital = Hospital(
                hospiName = row["dutyName"],
                divName = row["dutyDivNam"],
                emclsName = row["dutyEmclsName"],
                emcRun = row["dutyEryn"],
                address = row["dutyAddr"],
                postCdn = row["postCdn"],
                latitude = row["wgs84Lat"],
                longitude = row["wgs84Lon"]
            )
            db.session.add(hospital)
        
        db.session.commit()
