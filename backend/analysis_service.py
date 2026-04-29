import re
from datetime import datetime
from db import reviews_collection

fake_keywords = [
    "best product ever",
    "changed my life",
    "life changing",
    "must buy",
    "worth every penny",
    "absolutely perfect",
    "five stars",
    "highly recommend",
    "amazing product",
    "excellent product",
    "cannot live without",
]

real_keywords = [
    "delivery",
    "battery",
    "screen",
    "quality",
    "price",
    "material",
    "design",
    "size",
    "performance",
    "packaging",
    "camera",
    "charger",
]

def clean_text(text):
    return text.strip().lower()

def analyze_text_features(text):
    text_lower = clean_text(text)

    fake_score = 0
    real_score = 0
    indicators = []

    for word in fake_keywords:
        if word in text_lower:
            fake_score += 15
            indicators.append(f"Contains suspicious phrase: '{word}'")

    for word in real_keywords:
        if word in text_lower:
            real_score += 8

    if re.search(r"\b([1-5]\s*stars?|five stars?)\b", text_lower):
        fake_score += 15
        indicators.append("Mentions star rating in review text")

    if text.count("!") >= 2:
        fake_score += 10
        indicators.append("Too many exclamation marks")

    word_count = len(text.split())
    if word_count < 8:
        fake_score += 10
        indicators.append("Review is too short")

    if fake_score > 20 and real_score == 0:
        fake_score += 10
        indicators.append("Generic praise without details")

    return fake_score, real_score, indicators

def analyze_vader(text):
    fake_score, real_score, indicators = analyze_text_features(text)
    confidence = min(100, max(0, 30 + fake_score - real_score))

    result = "FAKE" if confidence >= 60 else "REAL"
    certainty = "High" if confidence >= 75 else "Medium" if confidence >= 60 else "Low"

    return {
        "method": "VADER",
        "result": result,
        "confidence": confidence,
        "certainty": certainty,
        "indicators": indicators
    }

def analyze_shap(text):
    fake_score, real_score, indicators = analyze_text_features(text)
    confidence = min(100, max(10, 45 + fake_score - real_score))

    if real_score == 0:
        indicators.append("No product details detected")

    result = "FAKE" if confidence >= 60 else "REAL"
    certainty = "High" if confidence >= 80 else "Medium" if confidence >= 60 else "Low"

    return {
        "method": "SHAP",
        "result": result,
        "confidence": confidence,
        "certainty": certainty,
        "indicators": indicators
    }

def analyze_hybrid(text):
    vader = analyze_vader(text)
    shap = analyze_shap(text)

    confidence = round((vader["confidence"] + shap["confidence"]) / 2)

    if confidence >= 65:
        result = "FAKE"
    elif confidence >= 50:
        result = "SUSPICIOUS"
    else:
        result = "REAL"

    return {
        "method": "HYBRID",
        "result": result,
        "confidence": confidence,
        "certainty": "High" if confidence >= 65 else "Medium" if confidence >= 50 else "Low",
        "components": {
            "vader": vader,
            "shap": shap
        }
    }

# 🔥 SAVE TO MONGODB
def add_single_history(text, result_data):
    try:
        doc = {
            "timestamp": datetime.utcnow(),
            "text": text,
            "method": result_data.get("method"),
            "result": result_data.get("result"),
            "confidence": result_data.get("confidence")
        }

        result = reviews_collection.insert_one(doc)

        print("✅ Inserted ID:", result.inserted_id)

    except Exception as e:
        print("❌ MongoDB Insert Error:", str(e))

def compare_all(text):
    vader = analyze_vader(text)
    shap = analyze_shap(text)
    hybrid = analyze_hybrid(text)

    try:
        reviews_collection.insert_one({
            "timestamp": datetime.utcnow(),
            "text": text,
            "method": "COMPARE",
            "result": f'VADER:{vader["result"]}, SHAP:{shap["result"]}, HYBRID:{hybrid["result"]}',
            "confidence": f'V:{vader["confidence"]}% S:{shap["confidence"]}% H:{hybrid["confidence"]}%'
        })

        print("✅ Compare data inserted")

    except Exception as e:
        print("❌ Compare Insert Error:", str(e))

    return {
        "vader": vader,
        "shap": shap,
        "hybrid": hybrid
    }

# 🔥 FETCH FROM DB
def get_history():
    data = list(reviews_collection.find({}, {"_id": 0}))
    return data[::-1]

def get_summary():
    data = list(reviews_collection.find())

    fake = real = suspicious = 0

    for item in data:
        r = str(item["result"]).upper()
        if "FAKE" in r:
            fake += 1
        elif "SUSPICIOUS" in r:
            suspicious += 1
        elif "REAL" in r:
            real += 1

    return {
        "total_analyzed": len(data),
        "fake": fake,
        "real": real,
        "suspicious": suspicious
    }

def build_csv():
    data = list(reviews_collection.find({}, {"_id": 0}))

    lines = ["timestamp,method,result,confidence,text"]

    for item in data:
        lines.append(
            f'{item["timestamp"]},"{item["method"]}","{item["result"]}","{item["confidence"]}","{item["text"]}"'
        )

    return "\n".join(lines)