from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# -----------------------
# In-memory storage
# -----------------------
users = {}
scores = {}
user_charity = {}

charities = ["Education Fund", "Cancer Care", "Child Support"]

# -----------------------
# Home
# -----------------------
@app.route('/', methods=['GET'])
def home():
    return "Golf App Backend Running"

# -----------------------
# Signup
# -----------------------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    if email in users:
        return jsonify({"message": "User already exists"}), 400

    users[email] = password
    scores[email] = []
    user_charity[email] = None

    return jsonify({"message": "User created successfully"})

# -----------------------
# Login
# -----------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if users.get(email) == password:
        return jsonify({"message": "Login successful"})

    return jsonify({"message": "Invalid credentials"}), 401

# -----------------------
# Add Score
# -----------------------
@app.route('/add-score', methods=['POST'])
def add_score():
    data = request.json
    email = data.get('email')
    score = int(data.get('score'))

    if email not in scores:
        scores[email] = []

    scores[email].append(score)

    # Keep only last 5 scores
    if len(scores[email]) > 5:
        scores[email].pop(0)

    return jsonify({
        "message": "Score added",
        "scores": scores[email]
    })

# -----------------------
# Get Scores
# -----------------------
@app.route('/scores/<email>', methods=['GET'])
def get_scores(email):
    return jsonify(scores.get(email, []))

# -----------------------
# Draw System
# -----------------------
@app.route('/draw', methods=['POST'])
def draw():
    winning_numbers = random.sample(range(1, 46), 5)

    return jsonify({
        "winning_numbers": winning_numbers
    })

# -----------------------
# Get Charities
# -----------------------
@app.route('/charities', methods=['GET'])
def get_charities():
    return jsonify(charities)

# -----------------------
# Select Charity
# -----------------------
@app.route('/select-charity', methods=['POST'])
def select_charity():
    data = request.json
    email = data.get('email')
    charity = data.get('charity')

    if charity not in charities:
        return jsonify({"message": "Invalid charity"}), 400

    user_charity[email] = charity

    return jsonify({
        "message": "Charity selected",
        "charity": charity
    })

# -----------------------
# Get Selected Charity
# -----------------------
@app.route('/get-charity/<email>', methods=['GET'])
def get_user_charity(email):
    return jsonify({
        "charity": user_charity.get(email)
    })

# -----------------------
# Run App
# -----------------------
if __name__ == "__main__":
    app.run(debug=True)