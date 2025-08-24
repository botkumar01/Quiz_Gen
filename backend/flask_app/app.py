from flask import Flask, request, jsonify
from ext import extract_text
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # React frontend

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400
    text = extract_text(file)
    return jsonify({"text": text})

if __name__ == "__main__":
    app.run(debug=True, port=8000)
