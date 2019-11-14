from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url = "localhost:5444"
db_name = "socialfood"
db_user = "postgres"
db_password = "passw"
engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_url}/{db_name}")
Session = sessionmaker(bind=engine)

Base = declarative_base()

class Entity():
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)

    def __init__(self):
        self.created_at = datetime.now()
