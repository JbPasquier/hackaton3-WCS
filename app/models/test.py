from app import db

class Test(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    toto = db.Column(db.String)
    

    def to_dict(self):
        return dict(
            toto = self.toto,
            id = self.id
        )

    def __repr__(self):
        return '<Test %r>' % (self.id)
