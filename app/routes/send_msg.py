from app import app
from flask import Flask
from flask_mail import Mail, Message


app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'hswfwild@gmail.com'
app.config['MAIL_PASSWORD'] = 'python12345'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

@app.route("/send_msg")
def index():
   msg = Message('Hello', sender = 'hswfwild@gmail.com', recipients = ['hswfwild@gmail.com'])
   msg.body = "This is the email body"
   mail.send(msg)
   return "Sent"
