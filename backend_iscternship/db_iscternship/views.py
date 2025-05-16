from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser
import fitz # PyMuPDF
import os

# Create your views here.
@api_view(['DELETE'])
def removerVagaEmpresa(request, vaga_id):
    try:
        vaga = Vaga.objects.get(pk=vaga_id)
    except Vaga.DoesNotExist:
        return Response({'error': 'Vaga não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    
    vaga.delete()
    return Response({'success': 'Vaga removida com sucesso.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def extract_text_from_pdf(request, pdf_path):
    path = os.path.normpath(os.path.join(settings.MEDIA_ROOT, pdf_path))
    if not os.path.exists(path):
        return Response({'error': 'PDF file not found'}, status=404)
    text = ""
    with fitz.open(path) as doc:
        for page in doc:
            text += page.get_text()
    return Response({'text': text})

@api_view(['POST'])
def editarVagaEmpresa(request, vaga_id):
    try:
        vaga = Vaga.objects.get(pk=vaga_id)
    except Vaga.DoesNotExist:
        return Response({'error': 'Vaga não encontrada.'}, status=404)

    vaga.titulo = request.data.get('titulo', vaga.titulo)
    vaga.descricao = request.data.get('descricao', vaga.descricao)
    vaga.estado = request.data.get('estado', vaga.estado)
    vaga.save()

    serializer = VagaSerializer(vaga)
    return Response(serializer.data, status=200)


@api_view(['POST'])
def criarVagaEmpresa(request, user_id):
    try:
        empresa = Empresa.objects.get(user__id=user_id)
    except Empresa.DoesNotExist:
        return Response({'error': 'Empresa não encontrada.'}, status=404)

    titulo = request.data.get('titulo')
    descricao = request.data.get('descricao')
    estado = request.data.get('estado', 'Aberta')
    isReportada = request.data.get('isReportada', False)

    if not titulo or not descricao:
        return Response({'error': 'Título e descrição são obrigatórios.'}, status=400)

    vaga = Vaga.objects.create(
        empresa=empresa,
        titulo=titulo,
        descricao=descricao,
        estado=estado,
        isReportada=isReportada
    )

    return Response({
        'id': vaga.id,
        'titulo': vaga.titulo,
        'descricao': vaga.descricao,
        'estado': vaga.estado,
        'isReportada': vaga.isReportada,
        'n_candidatos': 0
    }, status=201)

@api_view(['GET'])
def verVagasEmpresa(request, empresa_id):
    try:
        empresa = Empresa.objects.get(user__id=empresa_id)
    except Empresa.DoesNotExist:
        return Response({'error': 'Empresa não encontrada.'}, status=404)
    vagas = Vaga.objects.filter(empresa=empresa)
    vagas_data = []
    for vaga in vagas:
        n_candidatos = Candidatura.objects.filter(vaga=vaga).count()
        vagas_data.append({
            "id": vaga.id,
            "titulo": vaga.titulo,
            "descricao": vaga.descricao,
            "estado": vaga.estado,
            "isReportada": vaga.isReportada,
            "n_candidatos": n_candidatos,
        })
    return Response(vagas_data)

@api_view(['GET'])
def vagasCandidato(request):
    vagas = Vaga.objects.filter(estado='Aberta')
    vagas_data = []
    for vaga in vagas:
        n_candidatos = Candidatura.objects.filter(vaga=vaga).count()
        empresa = vaga.empresa
        vagas_data.append({
            "id": vaga.id,
            "titulo": vaga.titulo,
            "descricao": vaga.descricao,
            "estado": vaga.estado,
            "isReportada": vaga.isReportada,
            "n_candidatos": n_candidatos,
            "empresa_nome": empresa.nome_empresa,
            "empresa_morada": empresa.morada,
            "empresa_telefone": empresa.telefone,
            "empresa_imagem": empresa.imagem.url if empresa.imagem else None
        })
    return Response(vagas_data)

@api_view(['GET'])
def vagasAdmin(request):
    vagas = Vaga.objects.all()
    vagas_data = []
    for vaga in vagas:
        n_candidatos = Candidatura.objects.filter(vaga=vaga).count()
        empresa = vaga.empresa
        vagas_data.append({
            "id": vaga.id,
            "titulo": vaga.titulo,
            "descricao": vaga.descricao,
            "estado": vaga.estado,
            "isReportada": vaga.isReportada,
            "n_candidatos": n_candidatos,
            "empresa_nome": empresa.nome_empresa,
            "empresa_morada": empresa.morada,
            "empresa_telefone": empresa.telefone,
            "empresa_imagem": empresa.imagem.url if empresa.imagem else None
        })
    return Response(vagas_data)



@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser])
def candidato(request, candidato_id):
    try:
        candidato = Candidato.objects.get(user__id=candidato_id)
    except Candidato.DoesNotExist:
        return Response({'error': 'Candidato não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CandidatoSerializer(candidato)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Atualiza primeiro os campos do User
        user = candidato.user
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.save()

        # Atualiza o Candidato
        serializer = CandidatoSerializer(candidato, data=request.data, partial=True)  # permite atualizar parcialmente
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
#@permission_classes([]) fazer permissões só superuser
def verVaga(request, vaga_id):
    vaga = Vaga.objects.get(pk=vaga_id)
    serializer = VagaSerializer(vaga)
    return Response(serializer.data)


@api_view(['GET'])  # (2)
@parser_classes([MultiPartParser])
#@permission_classes([IsAuthenticated])
def candidatoAdmin(request, candidato_id):
    candidato = Candidato.objects.get(pk=candidato_id)
    serializer = CandidatoSerializerAdmin(candidato)
    return Response(serializer.data)


@api_view(['GET'])
@parser_classes([MultiPartParser])
#@permission_classes([]) fazer permissões só superuser
def verCandidatos(request):
    candidato = Candidato.objects.all()
    serializer = CandidatoSerializerAdmin(candidato, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@parser_classes([MultiPartParser])
#@permission_classes([]) fazer permissões só superuser
def verEmpresas(request):
    empresa = Empresa.objects.all()
    serializer = EmpresaSerializerAdmin(empresa, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
#@permission_classes([]) fazer permissões só superuser
def deleteCandidato(request, candidato_id):
    candidato = Candidato.objects.get(pk=candidato_id)
    user = User.objects.get(pk=candidato.user_id)
    candidato.delete()
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["DELETE"])
#@permission_classes([]) fazer permissões só superuser
def deleteEmpresa(request, empresa_id):
    empresa = Empresa.objects.get(pk=empresa_id)
    user = User.objects.get(pk=empresa.user_id)
    empresa.delete()
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser])
def empresa(request, empresa_id):
    try:
        empresa = Empresa.objects.get(user__id=empresa_id)
    except Empresa.DoesNotExist:
        return Response({'error': 'Empresa não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EmpresaSerializer(empresa)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Atualiza primeiro o User (email)
        user = empresa.user
        user.email = request.data.get('email', user.email)
        user.save()

        # Atualiza Empresa
        serializer = EmpresaSerializer(empresa, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signupCandidato(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    descricao = request.data.get('descricao')
    telefone = request.data.get('telefone')

    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    if email is None or first_name is None or last_name is None:
        return Response({'error': 'invalid email/first_name/last_name'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    candidato = Candidato(user = user, descricao = descricao , telefone = telefone)
    candidato.save()
    return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signupEmpresa(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    nome_empresa = request.data.get('nome_empresa')
    morada = request.data.get('morada')
    telefone = request.data.get('telefone')


    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    if email is None or nome_empresa is None:
        return Response({'error': 'invalid email/nome_empresa'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email, is_staff= True)
    empresa = Empresa(user = user, nome_empresa = nome_empresa, morada = morada, telefone = telefone)
    empresa.save()
    return Response({'message': 'Empresa ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user) # Criação da sessão
        user = User.objects.get(username=username)
        serializer = UserSerializerAdmin(user)
        return Response(serializer.data)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})
