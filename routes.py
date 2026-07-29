from flask import request, jsonify, send_from_directory
from app import app
from database import save_contact
from email_service import send_admin_email, send_customer_ack_email


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/style.css")
def css():
    return send_from_directory(".", "style.css")


@app.route("/script.js")
def javascript():
    return send_from_directory(".", "script.js")

@app.route("/images/<path:filename>")
def images(filename):
    return send_from_directory("images", filename)


@app.route("/api/contact", methods=["POST"])
def contact():

    data = request.get_json()

    print("\n========== NEW CUSTOMER ==========")
    print(data)

    try:
        save_contact(data)

        send_admin_email(data)
        send_customer_ack_email(data)

        print("✅ Saved to MySQL.")
        print("✅ Both emails sent successfully.")

        return jsonify({
            "success": True,
            "message": "Thank you! Your enquiry has been received."
        }), 200

    except Exception as e:

        print("❌ ERROR:", e)

        return jsonify({
            "success": False,
            "message": "Something went wrong."
        }), 500
@app.route("/customers")
def customers():
    conn = sqlite3.connect("customers.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM customers")
    rows = cursor.fetchall()

    conn.close()

    return str(rows)