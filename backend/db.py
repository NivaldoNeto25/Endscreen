from sqlalchemy import *
from sqlalchemy.orm import *

Base = declarative_base()

engine = create_engine('sqlite:///endscreen.db', echo=True)

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
    user_id = Column(Integer, ForeignKey('usuarios.id'))
    userName = Column(String)

Base.metadata.create_all(engine)

def usuarioExiste(data):

    return session.query(Usuario).filter_by(email=data.get('email')).first()

def criarUsuario(data):

    novo_usuario = Usuario(
        name = data.get('nome'),
        email = data.get('email'),
        password = data.get('senha')
    )

    try:
        session.add(novo_usuario)
        session.commit()
    except Exception as e:
        session.rollback()

    return novo_usuario

def loginUsuario(data):

    return session.query(Usuario).filter_by(email=data.get('email'), password=data.get('senha')).first()

def adicionarJogo(data):

    novo_jogo = Jogo(
        name=data.get('name'),
        platform=data.get('platform'),
        rating=data.get('rating'),
        hours=data.get('hours'),
        review=data.get('review', ''),
        user_id=data.get('userId'),
        userName=data.get('userName')
    )

    try:
        session.add(novo_jogo)
        session.commit()
    except Exception as e:
        session.rollback()

    return novo_jogo

def listarJogosDoUsuario(user_id):

    return session.query(Jogo).filter_by(user_id=user_id).all()

def listarTodosJogos():

    return session.query(Jogo).all()

def encontrarJogoPorId(jogo_id):

    return session.query(Jogo).filter_by(id=jogo_id).first()

def atualizarJogo(jogo_id, data):

    jogo = encontrarJogoPorId(jogo_id)

    if jogo:
        if 'name' in data: jogo.name = data['name']
        if 'platform' in data: jogo.platform = data['platform']
        if 'rating' in data: jogo.rating = data['rating']
        if 'hours' in data: jogo.hours = data['hours']
        if 'review' in data: jogo.review = data['review']
    
        try:
            session.commit()
            return True
        except Exception as e:
            session.rollback()
            return False

    return False

def deletarJogo(jogo_id):

    jogo = encontrarJogoPorId(jogo_id)

    if jogo:
        try:
            session.delete(jogo)
            session.commit()
            return True
        except Exception as e:
            session.rollback()
            return False

    return False