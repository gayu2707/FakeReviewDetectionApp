from pymongo import MongoClient
import os
from dotenv import load_dotenv
import certifi

load_dotenv()  

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("❌ MONGO_URI not found in backend/.env")

client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client["reviewDB"]
reviews_collection = db["reviews"]

print("✅ MongoDB Connected Successfully")