import sqlite3

conn = sqlite3.connect("customers.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    service TEXT,
    message TEXT
)
""")

conn.commit()
conn.close()

print("Database Created Successfully!")