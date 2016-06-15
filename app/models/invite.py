from app import db

class Invite(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    salon_id = db.Column(db.Integer)
    
    name = db.Column(db.String)
    
    firstName = db.Column(db.String)
    
    email = db.Column(db.String)
    

    def to_dict(self):
        return dict(
            salon_id = self.salon_id,
            name = self.name,
            firstName = self.firstName,
            email = self.email,
            id = self.id
        )

    def __repr__(self):
        return '<Invite %r>' % (self.id)
