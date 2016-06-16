from app import app, db
from app.models import salons, invite, activitis
from flask import abort, jsonify, request
import datetime
import json

@app.route('/flaskang/salons', methods = ['GET'])
def get_all_salons():
    entities = salons.Salons.query.all()
    return json.dumps([entity.to_dict([entity.to_dict() for entity in invite.Invite.query.filter_by(salon_id=entity.id)],[entity.to_dict() for entity in activitis.Activitis.query.filter_by(salon_id=entity.id)]) for entity in entities])

@app.route('/flaskang/salons/<int:id>', methods = ['GET'])
def get_salons(id):
    entity = salons.Salons.query.get(id)
    invites = invite.Invite.query.filter_by(salon_id=entity.id)
    activities = activitis.Activitis.query.filter_by(salon_id=entity.id)
    if not entity:
        abort(404)
    return json.dumps(entity.to_dict([entity.to_dict() for entity in invites], [entity.to_dict() for entity in activities]))

@app.route('/flaskang/salons', methods = ['POST'])
def create_salons():
    entity = salons.Salons(
        title = request.json['title']
        , password = request.json['password']
        , departurePlace = request.json['departurePlace']
        , arrivePlace = request.json['arrivePlace']
        , departureDate = request.json['departureDate']
        , returndate = request.json['returndate']
        , description = request.json['description']
        , thematique = request.json['thematique']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/flaskang/salons/<int:id>', methods = ['PUT'])
def update_salons(id):
    entity = salons.Salons.query.get(id)
    if not entity:
        abort(404)
    entity = salons.Salons(
        title = request.json['title'],
        password = request.json['password'],
        departurePlace = request.json['departurePlace'],
        arrivePlace = request.json['arrivePlace'],
        departureDate = request.json['departureDate'],
        returndate = request.json['returndate'],
        description = request.json['description'],
        thematique = request.json['thematique'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/flaskang/salons/<int:id>', methods = ['DELETE'])
def delete_salons(id):
    entity = salons.Salons.query.get(id)
    invites = invite.Invite.query.filter_by(salon_id=entity.id)
    activitis = activitis.Activitis.query.filter_by(salon_id=entity.id)
    if not entity:
        abort(404)
    [db.session.delete(entity) for entity in invites]
    [db.session.delete(entity) for entity in activitis]
    db.session.delete(entity)
    db.session.commit()
    return '', 204
