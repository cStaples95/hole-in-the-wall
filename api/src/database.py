from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Casey Staples
# V .01
# File for database connection and session

# Database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./testing_db.db"

# Create engine, allows multiple connections and threads
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={
                       "check_same_thread": False})

# Create session for database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()
