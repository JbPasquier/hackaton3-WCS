from app import db

class Activitis(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    salon_id = db.Column(db.Integer)
    
    description = db.Column(db.String)
    
    cost = db.Column(db.Integer)
    

    def to_dict(self):
        return dict(
            salon_id = self.salon_id,
            description = self.description,
            cost = self.cost,
            id = self.id
        )

    def __repr__(self):
        return '<Activitis %r>' % (self.id)
