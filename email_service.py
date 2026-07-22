import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import Config


def send_admin_email(data):

    msg = MIMEMultipart()

    msg["From"] = Config.SMTP_EMAIL
    msg["To"] = Config.SMTP_EMAIL
    msg["Subject"] = "New Website Enquiry - NETWORKS"

    body = f"""
New Website Enquiry

Name: {data['name']}
Company: {data['company']}
Email: {data['email']}
Phone: {data['phone']}
Service: {data['service']}

Message:
{data['message']}
"""

    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP(Config.SMTP_SERVER, Config.SMTP_PORT)
    server.starttls()
    server.login(Config.SMTP_EMAIL, Config.SMTP_PASSWORD)
    server.send_message(msg)
    server.quit()
def send_customer_ack_email(data):
    print("Sending acknowledgement to:", data["email"])

    msg = MIMEMultipart()

    msg["From"] = Config.SMTP_EMAIL
    msg["To"] = data["email"]
    msg["Subject"] = "Thank You for Contacting NETWORKS"

    body = f"""
Dear {data['name']},

Thank you for contacting NETWORKS.

We have received your enquiry regarding:

Service: {data['service']}

Our technical team will contact you within 24 hours.

Regards,

NETWORKS
Enterprise Networking Solutions

Email: sales@networks-in.com
Website: https://www.networks-in.com

"""

    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP(Config.SMTP_SERVER, Config.SMTP_PORT)
    server.starttls()
    server.login(Config.SMTP_EMAIL, Config.SMTP_PASSWORD)
    server.send_message(msg)
    server.quit()