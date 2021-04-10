from app import db

class Hospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dutyName = db.Column(db.String(64), nullable=False)
    dutyDivNam = db.Column(db.String(16), nullable=False)
    dutyEmclsName = db.Column(db.String(32), nullable=False)
    dutyEryn = db.Column(db.Integer, nullable=False)
    dutyAddr = db.Column(db.Text, nullable=False)
    postCdn = db.Column(db.Integer, nullable=True)
    wgs84Lat = db.Column(db.Float(2, 10), nullable=True)
    wgs84Lon = db.Column(db.Float(3, 10), nullable=True)
