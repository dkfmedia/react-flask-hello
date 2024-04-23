"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    current_user = get_jwt_identity()
    return jsonify(logged_in_as = current_user), 200

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    # password = request.json.get("password", None)
    # if email !=  "test" or password != "test":
    #     return jsonify({"msg":"Bad email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/user", methods=["GET"])
def get_all_users(): 
    users = User.query.all()
    all_users = list(map(lambda x : x.serialize(), users))
    return jsonify(all_users), 200 

@api.route("/user/<int:id>", methods=["GET"])
def get_user(id): 
    user = User.query.get(id)
    if user is None:
      raise APIException("User not found", status_code= 404 )
    return jsonify(user.serialize()), 200

@api.route("/signup", methods=["POST"])
def create_user(): 
    body = request.get_json()
    user = User() 
    if "email" not in body: 
        raise APIException("You need to provide an email", status_code=400)
    if "password" not in body: 
        raise APIException("You need to provide an password", status_code=400)
    user.email = body["email"]
    user.password = body ["password"]
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route("/user/<int:id>", methods=["PUT"])
def update_user(id): 
    body = request.get_json()
    user = User.query.get(id)
    if user is None: 
        raise APIException("User not found", status_code= 404)
    if "email" not in body: 
        raise APIException("You need to provide an email", status_code=400)
    if "password" not in body: 
        raise APIException("You need to provide an password", status_code=400)
    if "is_active" in body:
        user.is_active = body["is_active"]
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route("/user/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    if user is None: 
        raise APIException("User not found", status_code= 404)
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile(): 
    return jsonify({"msg":"this is a private endpoint, you need to login to see it"}),  200