from sqlalchemy import Column, String, Integer, ARRAY, relationship, back_populates

from .entity import Entity, Base

from marshmallow import Schema, fields

class User(Base, Entity):
    __tablename__ = "user"

    name = Column(String)
    email = Column(String)
    pw = Column(String)
    offers = relationship("Offer", back_populates="owner")

    def __init__(self, name, email, pw):
        Entity.__init__(self)
        self.name = name
        self.email = email
        self.pw = pw

class UserSchema(Schema):
    id = fields.Number()
    created_at = fields.DateTime()

    name = fields.String()
    email = fields.String()
    pw = Column(String)
    offers = fields.Nested("OfferSchema", many=True, exclude=("owner"))