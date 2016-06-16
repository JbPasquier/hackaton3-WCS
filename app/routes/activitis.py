from app import app, db
from app.models import activitis
from flask import abort, jsonify, request
import datetime
import json

@app.route('/hswf/activitis', methods = ['GET'])
def get_all_activitis():
    entities = activitis.Activitis.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/hswf/activitis/<int:id>', methods = ['GET'])
def get_activitis(id):
    entity = activitis.Activitis.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/hswf/activitis', methods = ['POST'])
def create_activitis():
    entity = activitis.Activitis(
        salon_id = request.json['salon_id']
        , description = request.json['description']
        , cost = request.json['cost']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/hswf/activitis/<int:id>', methods = ['PUT'])
def update_activitis(id):
    entity = activitis.Activitis.query.get(id)
    if not entity:
        abort(404)
    entity = activitis.Activitis(
        salon_id = request.json['salon_id'],
        description = request.json['description'],
        cost = request.json['cost'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/hswf/activitis/<int:id>', methods = ['DELETE'])
def delete_activitis(id):
    entity = activitis.Activitis.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
