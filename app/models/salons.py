from app import db

class Salons(db.Model):
    id = db.Column(db.Integer, primary_key = True)

    title = db.Column(db.String)
    
    password = db.Column(db.String)
    
    departurePlace = db.Column(db.String)
    
    arrivePlace = db.Column(db.String)
    
    departureDate = db.Column(db.Integer)
    
    returndate = db.Column(db.Integer)
    
    description = db.Column(db.String)
    
    thematique = db.Column(db.Enum('fisting camp', 'sexfriend', 'hot', 'gangbang', 'only virgin', 'roleplay', 'cosplay', 'hardcore', 'bukkake', 'milf', 'daddy', 'yoan', 'animals', 'under 18', 'soft', 'toys', 'augmented reality', 'lesbian', 'fetishist', 'over 50', 'teen', 'bdsm', 'gore', 'php'))
    

    def to_dict(self, toto, titi):
        return dict(
            title = self.title,
            password = self.password,
            departurePlace = self.departurePlace,
            arrivePlace = self.arrivePlace,
            departureDate = self.departureDate,
            returndate = self.returndate,
            description = self.description,
            thematique = self.thematique,
            invites = toto,
            activities = titi,
            id = self.id
        )

    def __repr__(self):
        return '<Salons %r>' % (self.id)
