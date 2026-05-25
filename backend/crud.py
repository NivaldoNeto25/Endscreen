from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

from db import adicionarJogo, atualizarJogo, criarUsuario, deletarJogo, listarJogosDoUsuario, listarTodosJogos, loginUsuario, usuarioExiste

PASTA_PROJETO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__, static_folder=PASTA_PROJETO, static_url_path='')

CORS(app)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/registrar', methods=['POST'])
def registrar():
    data = request.json
    
    existing_user = usuarioExiste(data)
    
    if existing_user:
        return jsonify({"success": False, "message": "Este e-mail já está em uso!"})
    
    novo_usuario = criarUsuario(data)
    
    return jsonify({"success": True, "user": {"id": novo_usuario.id, "nome": novo_usuario.name}})

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    usuario = loginUsuario(data)

    if usuario:
        return jsonify({"success": True, "user": {"id": usuario.id, "nome": usuario.name}})

    return jsonify({"success": False, "message": "E-mail ou senha incorretos."})

@app.route('/jogos', methods=['POST'])
def adicionar_jogo():
    data = request.json
    
    novo_jogo = adicionarJogo(data)

    if novo_jogo:
        return jsonify({"success": True, "message": "Jogo salvo!"})
    
    return jsonify({"success": False, "message": "Erro ao salvar jogo."})

@app.route('/jogos/usuario/<int:user_id>', methods=['GET'])
def listar_jogos_usuario(user_id):

    jogos = listarJogosDoUsuario(user_id)

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

    jogos = listarTodosJogos()
    
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

    sucesso = atualizarJogo(jogo_id, data)

    if sucesso:
        return jsonify({"success": True, "message": "Jogo atualizado!"})

    return jsonify({"success": False, "message": "Jogo não encontrado."})


@app.route('/jogos/<int:jogo_id>', methods=['DELETE'])
def deletar_jogo(jogo_id):

    sucesso = deletarJogo(jogo_id)

    if sucesso:
        return jsonify({"success": True, "message": "Jogo deletado!"})
    
    return jsonify({"success": False, "message": "Jogo não encontrado."})

if __name__ == '__main__':
    app.run(debug=True)