from app import db

class Hospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dutyName = db.Column(db.String(64), nullable=False)
    dutyDivNam = db.Column(db.String(16), nullable=False)
    dutyEmclsName = db.Column(db.String(32), nullable=False)
    dutyEryn = db.Column(db.Integer, nullable=False)
    dutyAddr = db.Column(db.Text, nullable=False)
    postCdn = db.Column(db.Integer, nullable=True)
    wgs84Lat = db.Column(db.String(20), nullable=True)
    wgs84Lon = db.Column(db.String(20), nullable=True)

class Residence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    residAddr = db.Column(db.String(32), nullable=False)
    residName = db.Column(db.String(64), nullable=False)
    residType = db.Column(db.String(10), nullable=False)
    minArea = db.Column(db.Float, nullable=True)
    maxArea = db.Column(db.Float, nullable=True)
    minSalePrice = db.Column(db.Float, nullable=True)
    maxSalePrice = db.Column(db.Float, nullable=True)
    minJeonsePrice = db.Column(db.Float, nullable=True)
    maxJeonsePrice = db.Column(db.Float, nullable=True)
    latitude = db.Column(db.String(20), nullable=True)
    longitude = db.Column(db.String(20), nullable=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    protectorLat = db.Column(db.String(20), nullable=True)
    protectorLng = db.Column(db.String(20), nullable=True)
    hospitalLat = db.Column(db.String(20), nullable=True)
    hospitalLng = db.Column(db.String(20), nullable=True)

class Scrap(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User')
    residence_id = db.Column(db.Integer, db.ForeignKey('residence.id'), nullable=False)
    residence = db.relationship('Residence')
