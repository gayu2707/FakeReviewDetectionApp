from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from analysis_service import *
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Fake Review Detection API running"})

@app.route("/analyze/vader", methods=["POST"])
def vader():
    text = request.json.get("text", "")
    result = analyze_vader(text)
    add_single_history(text, result)
    return jsonify(result)

@app.route("/analyze/shap", methods=["POST"])
def shap():
    text = request.json.get("text", "")
    result = analyze_shap(text)
    add_single_history(text, result)
    return jsonify(result)

@app.route("/analyze/hybrid", methods=["POST"])
def hybrid():
    text = request.json.get("text", "")
    result = analyze_hybrid(text)
    add_single_history(text, result)
    return jsonify(result)


@app.route("/compare", methods=["POST"])
def compare():
    text = request.json.get("text", "")
    results = compare_all(text)
    return jsonify({"results": results})   # ✅ wrap inside "results"

@app.route("/history")
def history():
    return jsonify(get_history())

@app.route("/reports/summary")
def summary():
    return jsonify(get_summary())

@app.route("/reports/download")
def download():
    return Response(
        build_csv(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=report.csv"}
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)