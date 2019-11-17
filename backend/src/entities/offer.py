from sqlalchemy import Column, String, Integer, ARRAY, ForeignKey, Float
from sqlalchemy.orm import relationship

from .entity import Entity, Base
from .user import User, UserSchema

from marshmallow import Schema, fields

class Offer(Base, Entity):
    __tablename__ = "offer"

    title = Column(String)
    description = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship("User", foreign_keys=[owner_id])
    dibsedby_id = Column(Integer, ForeignKey('user.id'))
    dibsedby = relationship("User", foreign_keys=[dibsedby_id])

    def __init__(self, title, description, lat, lng, owner_id):
        Entity.__init__(self)
        self.title = title
        self.description = description
        self.owner_id = owner_id
        self.lat = lat
        self.lng = lng

class OfferSchema(Schema):
    id = fields.Number()
    created_at = fields.DateTime()

    title = fields.String()
    description = fields.String()
    lat = fields.Number()
    lng = fields.Number()
    owner_id = fields.Number()
    owner = fields.Nested(UserSchema, only=("name", "telegram"))
    dibsedby_id = fields.Number()
    dibsedby = fields.Nested(UserSchema, only=("name", "telegram"))

