from sqlalchemy import Column, Integer, String, Text
from database import Base

class TestsAndStandards(Base):
    __tablename__ = "tests_and_standards"

    id = Column(Integer, primary_key=True, index=True)

    product_id = Column(String, index=True)

    test_type = Column(String)

    # stored as JSON string (SQLite does not have native JSON type)
    test_requirements = Column(Text)

    test_standards = Column(Text)
