from flask import request, jsonify 
from app import app
from database import save_contact 
from email_service import send_admin_email, send_customer_ack_email

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
    
    save_contact(data)
    try:
     send_admin_email(data)
     send_customer_ack_email(data)
     print("✅ Email sent successfully.")
    except Exception as e:
     print(f"❌ Email Error: {e}")

    print("✅ Saved to MySQL.")

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