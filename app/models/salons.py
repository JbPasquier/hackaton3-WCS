from app import db

class Salons(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    title = db.Column(db.String)
    
    password = db.Column(db.String)
    
    departurePlace = db.Column(db.String)
    
    arrivePlace = db.Column(db.String)
    
    departuredate = db.Column(db.Integer)
    
    returndate = db.Column(db.Integer)
    
    description = db.Column(db.String)
    

    def to_dict(self, toto, titi):
        return dict(
            title = self.title,
            password = self.password,
            departurePlace = self.departurePlace,
            arrivePlace = self.arrivePlace,
            departuredate = self.departuredate,
            returndate = self.returndate,
            description = self.description,
            invites = toto,
            activities = titi,
            id = self.id
        )


    def __repr__(self):
        return '<Salons %r>' % (self.id)
