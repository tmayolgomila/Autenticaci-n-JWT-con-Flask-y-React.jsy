"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



#api = Blueprint('api', __name__)
ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(file)), '../public/')
app = Flask(name)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/')



@app.route('/token', methods=['POST'])
def create_token():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    #Consultamos base de datos por email y contraseña
    user = User.filter.query(username=username, email=email, password=password).first()
    if user is None:
        return jsonify({"msg":"error in the username, email or password"}), 401
    #Creamos un nuevo token con el id del usuario
    access_token = create_access_token( identity=user.id)
    return jsonify({"token":access_token, "user_id":user.id}), 200

@app.route("/private", methods=['GET'])
@jwt_required()
def private():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

@app.route("/signup", methods = ["POST"])
def signup():
    body = request.get_json()
    comprobando = User.query.filter_by(email = body["email"]).first()
    if comprobando != None:
        return "el usuario ya existe"
    user = User(username = body["username"],email = body["email"], password = body["password"])
    db.session.add(user)
    db.session.commit()
    token=create_access_token(identity=user.id)
    return jsonify(token)

@app.route("/login", methods = ["POST"])
def signup():
    body = request.get_json()
    comprobando = User.query.filter_by(email = body["email"]).first()
    if comprobando == None:
        return "el usuario no existe"
    user = User(username = body["username"],email = body["email"], password = body["password"])
    db.session.add(user)
    db.session.commit()
    token=create_access_token(identity=user.id)
    return jsonify(token)



