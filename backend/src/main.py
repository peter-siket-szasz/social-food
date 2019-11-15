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
    return jsonify(offers), 201


@app.route('/addoffer', methods=["POST"])
def add_offer():
    posted_offer = OfferSchema(only=("title", "description", "owner_id")).load(request.get_json())

    offer = Offer(**posted_offer)

    # Persist
    session = Session()
    session.add(offer)
    session.commit()

    # return
    new_offer = OfferSchema().dump(offer)
    session.close()
    return jsonify(new_offer), 201


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
    return jsonify(new_user), 201

@app.route('/login', methods=["POST"])
def login():
    posted_creds = request.get_json()
    username = posted_creds["name"]

    session = Session()

    user_object = session.query(User).filter(User.name==username).first()
    app.logger.debug(user_object)

    schema = UserSchema()
    user = schema.dump(user_object)
    app.logger.debug(user)
    session.close()

    if not user:
        return jsonify({"error": "No user with that name"}), 201
    
    if posted_creds["pw"] == user["pw"]:
        app.logger.debug(user["id"])
        return jsonify({"id": user["id"]}), 201
    else:
        app.logger.debug("Incorrect pw")
        return jsonify({"error": "Incorrect password"}), 201
    


@app.route('/')
def test_method():
    return 'hello world'
