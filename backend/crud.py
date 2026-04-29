from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import time

PASTA_PROJETO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__, static_folder=PASTA_PROJETO, static_url_path='')

CORS(app)

ARQUIVO_JOGOS = 'banco_de_jogos.json'
ARQUIVO_USERS = 'banco_de_usuarios.json'

def carregar_dados(arquivo):
    if os.path.exists(arquivo):
        with open(arquivo, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def salvar_dados(arquivo, dados):
    with open(arquivo, 'w', encoding='utf-8') as f:
        json.dump(dados, f, indent=4, ensure_ascii=False)


@app.route('/')
def index():
    # Envia o arquivo index.html que está na raiz do projeto
    return send_from_directory(app.static_folder, 'index.html')

# ==========================================
# ROTAS DE AUTENTICAÇÃO
# ==========================================
@app.route('/registrar', methods=['POST'])
def registrar():
    dados = request.json
    usuarios = carregar_dados(ARQUIVO_USERS)
    
    # Verifica se o e-mail já existe
    for u in usuarios:
        if u.get('email') == dados.get('email'):
            return jsonify({"success": False, "message": "Este e-mail já está em uso!"})
            
    # Cria a nova conta
    novo_usuario = {
        "id": int(time.time() * 1000),
        "nome": dados.get('nome'),
        "email": dados.get('email'),
        "senha": dados.get('senha')
    }
    usuarios.append(novo_usuario)
    salvar_dados(ARQUIVO_USERS, usuarios)
    
    return jsonify({"success": True, "user": {"id": novo_usuario['id'], "nome": novo_usuario['nome']}})

@app.route('/login', methods=['POST'])
def login():
    dados = request.json
    usuarios = carregar_dados(ARQUIVO_USERS)
    
    for u in usuarios:
        if u.get('email') == dados.get('email') and u.get('senha') == dados.get('senha'):
            return jsonify({"success": True, "user": {"id": u['id'], "nome": u['nome']}})
            
    return jsonify({"success": False, "message": "E-mail ou senha incorretos."})

# ==========================================
# ROTAS DE JOGOS (CRUD)
# ==========================================
@app.route('/jogos', methods=['GET'])
def listar_todos_jogos():
    jogos = carregar_dados(ARQUIVO_JOGOS)
    return jsonify(jogos)

@app.route('/jogos/usuario/<int:user_id>', methods=['GET'])
def listar_jogos_usuario(user_id):
    jogos = carregar_dados(ARQUIVO_JOGOS)
    jogos_filtrados = [j for j in jogos if j.get('userId') == user_id]
    return jsonify(jogos_filtrados)

@app.route('/jogos', methods=['POST'])
def adicionar_jogo():
    novo_jogo = request.json
    novo_jogo['id'] = int(time.time() * 1000) 
    
    jogos = carregar_dados(ARQUIVO_JOGOS)
    jogos.append(novo_jogo)
    salvar_dados(ARQUIVO_JOGOS, jogos)
    return jsonify({"success": True, "message": "Jogo salvo!"})

@app.route('/jogos/<int:jogo_id>', methods=['PUT'])
def atualizar_jogo(jogo_id):
    dados_atualizados = request.json
    jogos = carregar_dados(ARQUIVO_JOGOS)
    
    for jogo in jogos:
        if jogo.get('id') == jogo_id:
            jogo.update(dados_atualizados)
            salvar_dados(ARQUIVO_JOGOS, jogos)
            return jsonify({"success": True})
            
    return jsonify({"success": False})

@app.route('/jogos/<int:jogo_id>', methods=['DELETE'])
def deletar_jogo(jogo_id):
    jogos = carregar_dados(ARQUIVO_JOGOS)
    jogos_filtrados = [j for j in jogos if j.get('id') != jogo_id]
    salvar_dados(ARQUIVO_JOGOS, jogos_filtrados)
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)