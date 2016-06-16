from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)


from app.models import invite
from app.models import activitis
from app.models import salons
from app.routes import index

from app.routes import invites
from app.routes import activitis
from app.routes import salons

from app.routes import send_msg
