from flask import Flask, jsonify, request
from flask_cors import CORS

from src.entities.entity import engine, Base, Session
from src.entities.user import User, UserSchema
from src.entities.offer import Offer, OfferSchema

app = Flask(__name__)
CORS(app)

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
    return jsonify(offers)


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
    posted_user = UserSchema(only=("name", "email", "pw")).load(request.get_json())

    user = User(**posted_user)

    session = Session()
    session.add(user)
    session.commit()

    new_user = UserSchema.dump(user)
    session.close()
    return jsonify(new_user), 201


@app.route('/')
def test_method():
    return 'hello world'
