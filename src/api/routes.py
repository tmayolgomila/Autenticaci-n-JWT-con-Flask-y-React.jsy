from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)

@api.route('/token', methods=['POST'])
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

@api.route("/private", methods=['GET'])
@jwt_required()
def private():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200




