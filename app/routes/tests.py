from app import app, db
from app.models import test
from flask import abort, jsonify, request
import datetime
import json

@app.route('/flaskang/tests', methods = ['GET'])
def get_all_tests():
    entities = test.Test.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/flaskang/tests/<int:id>', methods = ['GET'])
def get_test(id):
    entity = test.Test.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/flaskang/tests', methods = ['POST'])
def create_test():
    entity = test.Test(
        toto = request.json['toto']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/flaskang/tests/<int:id>', methods = ['PUT'])
def update_test(id):
    entity = test.Test.query.get(id)
    if not entity:
        abort(404)
    entity = test.Test(
        toto = request.json['toto'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/flaskang/tests/<int:id>', methods = ['DELETE'])
def delete_test(id):
    entity = test.Test.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
