from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)








