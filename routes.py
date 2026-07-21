from flask import request, jsonify
from app import app

@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "NETWORKS Backend Running"
    })

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()

    print("\n========== NEW CUSTOMER ==========")
    print(data)
    print("==================================")

    return jsonify({
        "success": True,
        "message": "Thank you! Your enquiry has been received."
    })
@app.route("/customers")
def customers():
    conn = sqlite3.connect("customers.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM customers")
    rows = cursor.fetchall()

    conn.close()

    return str(rows)