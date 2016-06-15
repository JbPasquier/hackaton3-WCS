from app import app, db
from app.models import invite
from flask import abort, jsonify, request
import datetime
import json

@app.route('/flaskang/invites', methods = ['GET'])
def get_all_invites():
    entities = invite.Invite.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/flaskang/invites/<int:id>', methods = ['GET'])
def get_invite(id):
    entity = invite.Invite.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/flaskang/invites', methods = ['POST'])
def create_invite():
    entity = invite.Invite(
        salon_id = request.json['salon_id']
        , name = request.json['name']
        , firstName = request.json['firstName']
        , email = request.json['email']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/flaskang/invites/<int:id>', methods = ['PUT'])
def update_invite(id):
    entity = invite.Invite.query.get(id)
    if not entity:
        abort(404)
    entity = invite.Invite(
        salon_id = request.json['salon_id'],
        name = request.json['name'],
        firstName = request.json['firstName'],
        email = request.json['email'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/flaskang/invites/<int:id>', methods = ['DELETE'])
def delete_invite(id):
    entity = invite.Invite.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
