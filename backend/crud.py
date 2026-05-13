from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from sqlalchemy import *
from sqlalchemy.orm import *

PASTA_PROJETO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__, static_folder=PASTA_PROJETO, static_url_path='')

CORS(app)

Base = declarative_base()

engine = create_engine('sqlite:///endscreen.db')

Session = sessionmaker(bind=engine)
session = Session()

class Usuario(Base):
    __tablename__ = 'usuarios'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)

class Jogo(Base):
    __tablename__ = 'jogos'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    platform = Column(String)
    rating = Column(String)
    hours = Column(String)
    review = Column(String)
    user_id = Column(Integer)
    userName = Column(String)

Base.metadata.create_all(engine)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/registrar', methods=['POST'])
def registrar():
    data = request.json
    
    existing_user = session.query(Usuario).filter_by(email=data.get('email')).first()
    
    if existing_user:
        return jsonify({"success": False, "message": "Este e-mail já está em uso!"})
   
    novo_usuario = Usuario(
        name = data.get('nome'),
        email = data.get('email'),
        password = data.get('senha')
    )

    session.add(novo_usuario)
    session.commit()
    
    return jsonify({"success": True, "user": {"id": novo_usuario.id, "nome": novo_usuario.name}})

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    usuario = session.query(Usuario).filter_by(email=data.get('email'), password=data.get('senha')).first()
    
    if usuario:
        return jsonify({"success": True, "user": {"id": usuario.id, "nome": usuario.name}})

    return jsonify({"success": False, "message": "E-mail ou senha incorretos."})

@app.route('/jogos', methods=['POST'])
def adicionar_jogo():
    data = request.json
    
    novo_jogo = Jogo(
        name=data.get('name'),
        platform=data.get('platform'),
        rating=data.get('rating'),
        hours=data.get('hours'),
        review=data.get('review', ''),
        user_id=data.get('userId'),
        userName=data.get('userName')
    )

    session.add(novo_jogo)
    session.commit()

    return jsonify({"success": True, "message": "Jogo salvo!"})

@app.route('/jogos/usuario/<int:user_id>', methods=['GET'])
def listar_jogos_usuario(user_id):
    jogos = session.query(Jogo).filter_by(user_id=user_id).all()
    lista_jogos = []

    for jogo in jogos:
        lista_jogos.append({
            "id": jogo.id,
            "name": jogo.name,
            "platform": jogo.platform,
            "rating": jogo.rating,
            "hours": jogo.hours,
            "review": jogo.review,
            "userId": jogo.user_id,
            "userName": jogo.userName
        })

    return jsonify(lista_jogos)

@app.route('/jogos', methods=['GET'])
def listar_todos_jogos():
    jogos = session.query(Jogo).all()
    lista_jogos = []

    for jogo in jogos:
        lista_jogos.append({
            "id": jogo.id,
            "name": jogo.name,
            "platform": jogo.platform,
            "rating": jogo.rating,
            "hours": jogo.hours,
            "review": jogo.review,
            "userId": jogo.user_id,
            "userName": jogo.userName
        })

    return jsonify(lista_jogos)

@app.route('/jogos/<int:jogo_id>', methods=['PUT'])
def atualizar_jogo(jogo_id):
    data = request.json
    jogo = session.query(Jogo).filter_by(id=jogo_id).first()

    if jogo:
        if 'name' in data: jogo.name = data['name']
        if 'platform' in data: jogo.platform = data['platform']
        if 'rating' in data: jogo.rating = data['rating']
        if 'hours' in data: jogo.hours = data['hours']
        if 'review' in data: jogo.review = data['review']
    
        session.commit()
        return jsonify({"success": True, "message": "Jogo atualizado!"})
    
    return jsonify({"success": False, "message": "Jogo não encontrado."})

@app.route('/jogos/<int:jogo_id>', methods=['DELETE'])
def deletar_jogo(jogo_id):
    jogo = session.query(Jogo).filter_by(id=jogo_id).first()

    if jogo:
        session.delete(jogo)
        session.commit()
        return jsonify({"success": True, "message": "Jogo deletado!"})
    
    return jsonify({"success": False, "message": "Jogo não encontrado."})

if __name__ == "__main__":
    app.run(debug=True)