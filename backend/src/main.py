from flask import Flask, jsonify, request
from flask_cors import CORS
import logging

from src.entities.entity import engine, Base, Session
from src.entities.user import User, UserSchema
from src.entities.offer import Offer, OfferSchema

app = Flask(__name__)
CORS(app)

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

Base.metadata.create_all(engine)

@app.route('/offers')
def get_offers():
    # Database
    session = Session()
    offer_objects = session.query(Offer).all()

    # Create serializable object
    schema = OfferSchema(many=True)
    offers = schema.dump(offer_objects)

    session.close()
    return jsonify(offers), 200


@app.route('/offers/<user>')
def get_offers_for(user):
    session = Session()
    offer_objects = session.query(Offer).filter(Offer.owner_id==user)

    schema = OfferSchema(many=True)
    offers = schema.dump(offer_objects)

    session.close()
    return jsonify(offers), 200


@app.route('/users/<id>')
def get_user(id):
    session = Session()
    user_object = session.query(User).filter(User.id==id).first()

    schema = UserSchema()
    user = schema.dump(user_object)

    session.close()
    return jsonify(user), 200


@app.route('/dibs', methods=["POST"])
def dibs():
    ids = request.get_json()
    user_id = ids["user_id"]
    offer_id = ids["offer_id"]

    session = Session()
    offer = session.query(Offer).filter(Offer.id==offer_id).first()

    offer.dibsedby_id = user_id
    session.commit()

    session.close()
    return "", 200


@app.route('/undibs', methods=["POST"])
def undibs():
    id = request.get_json()["offer_id"]

    session = Session()
    offer = session.query(Offer).filter(Offer.id==id).first()

    offer.dibsedby_id = None
    session.commit()
    offer = session.query(Offer).filter(Offer.id==id).first()
    app.logger.debug(offer.dibsedby_id)

    session.close()
    return "", 200


@app.route('/dibses/<user>')
def get_dibses(user):
    session = Session()
    offer_objects = session.query(Offer).filter(Offer.dibsedby_id==user)

    schema = OfferSchema(many=True)
    offers = schema.dump(offer_objects)

    session.close()
    return jsonify(offers), 200


@app.route('/offers/<id>', methods=["DELETE"])
def delete_offer(id):
    session = Session()
    offer = session.query(Offer).filter(Offer.id==id).first()
    session.delete(offer)
    session.commit()
    session.close()
    return "", 200

@app.route('/users/<id>', methods=["DELETE"])
def delete_user(id):
    session = Session()
    user = session.query(User).filter(User.id==id).first()
    session.delete(user)
    session.commit()
    session.close()
    return "", 200


@app.route('/users')
def get_users():
    # Database
    session = Session()
    user_objects = session.query(User).all()

    # Create serializable object
    schema = UserSchema(many=True)
    users = schema.dump(user_objects)

    session.close()
    return jsonify(users), 200


@app.route('/addoffer', methods=["POST"])
def add_offer():
    posted_offer = OfferSchema(only=("title", "description", "lat", "lng", "owner_id")).load(request.get_json())

    offer = Offer(**posted_offer)

    # Persist
    session = Session()
    session.add(offer)
    session.commit()

    # return
    new_offer = OfferSchema().dump(offer)
    session.close()
    return jsonify(new_offer), 200


@app.route('/users', methods=["POST"])
def add_user():
    posted_user = UserSchema(only=("name", "email", "telegram", "pw")).load(request.get_json())

    user = User(**posted_user)

    session = Session()
    try:
        session.add(user)
        session.commit()
    except Exception:
        session.close()
        return 'User with that name already exists', 500

    new_user = UserSchema().dump(user)
    session.close()
    return jsonify(new_user), 200


@app.route('/login', methods=["POST"])
def login():
    posted_creds = request.get_json()
    username = posted_creds["name"]

    session = Session()

    user_object = session.query(User).filter(User.name==username).first()

    schema = UserSchema()
    user = schema.dump(user_object)
    session.close()

    if not user:
        return jsonify({"error": "No user with that name"}), 200
    
    if posted_creds["pw"] == user["pw"]:
        return jsonify({"id": user["id"], "name": user["name"]}), 200
    else:
        return jsonify({"error": "Incorrect password"}), 200


@app.route('/')
def test_method():
    return 'hello world'
