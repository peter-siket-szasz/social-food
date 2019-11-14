from sqlalchemy import Column, String, Integer, ARRAY, ForeignKey
from sqlalchemy.orm import relationship

from .entity import Entity, Base
from .user import User, UserSchema

from marshmallow import Schema, fields

class Offer(Base, Entity):
    __tablename__ = "offer"

    title = Column(String)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship("User", back_populates="offers")

    def __init__(self, title, description, owner_id):
        Entity.__init__(self)
        self.title = title
        self.description = description
        self.owner_id = owner_id

class OfferSchema(Schema):
    id = fields.Number()
    created_at = fields.DateTime()

    title = fields.String()
    description = fields.String()
    owner_id = fields.Number()
    owner = fields.Nested(UserSchema, only=("name", "email"))

