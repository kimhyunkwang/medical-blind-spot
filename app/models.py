from app import db

class Hospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hospiName = db.Column(db.String(64), nullable=False)
    divName = db.Column(db.String(16), nullable=False)
    emclsName = db.Column(db.String(32), nullable=False)
    emcRun = db.Column(db.Integer, nullable=False)
    address = db.Column(db.Text, nullable=False)
    postCdn = db.Column(db.Integer, nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
