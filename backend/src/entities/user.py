from sqlalchemy import Column, String, Integer, ARRAY
from sqlalchemy.orm import relationship

from .entity import Entity, Base

from marshmallow import Schema, fields

class User(Base, Entity):
    __tablename__ = "user"

    name = Column(String, unique=True)
    email = Column(String)
    telegram = Column(String)
    pw = Column(String)

    def __init__(self, name, email, telegram, pw):
        Entity.__init__(self)
        self.name = name
        self.email = email
        self.telegram = telegram
        self.pw = pw

class UserSchema(Schema):
    id = fields.Number()
    created_at = fields.DateTime()

    name = fields.String()
    email = fields.String()
    telegram = fields.String()
    pw = fields.String()