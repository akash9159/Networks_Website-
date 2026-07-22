import mysql.connector
from config import Config


def get_connection():
    return mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )


def save_contact(data):
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO contacts
    (name, company, email, phone, service, message)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    values = (
        data.get("name"),
        data.get("company"),
        data.get("email"),
        data.get("phone"),
        data.get("service"),
        data.get("message")
    )

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()
def get_all_contacts():

    conn = get_connection()

    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM contacts
        ORDER BY created_at DESC
    """)

    contacts = cursor.fetchall()

    cursor.close()
    conn.close()

    return contacts