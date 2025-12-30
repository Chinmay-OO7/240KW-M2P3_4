from pydantic import BaseModel
from typing import List

class TestingData(BaseModel):
    product_id: str
    test_type: str
    test_requirements: List[str]
    test_standards: List[str]