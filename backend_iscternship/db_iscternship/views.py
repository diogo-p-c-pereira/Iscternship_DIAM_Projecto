from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

# Create your views here.


@api_view(['GET', 'POST'])  # (2)
#@permission_classes([IsAuthenticated])
def candidato(request, candidato_id):
    if request.method == 'GET':  # (3)
        candidato = Candidato.objects.get(pk=candidato_id)
        serializer = CandidatoSerializer(candidato)
        return Response(serializer.data)

    elif request.method == 'POST':  # (3)
        serializer = CandidatoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

    return Response(status=status.HTTP_201_CREATED)


@api_view(['GET'])  # (2)
#@permission_classes([IsAuthenticated])
def candidatoAdmin(request, candidato_id):
    candidato = Candidato.objects.get(pk=candidato_id)
    serializer = CandidatoSerializerAdmin(candidato)
    return Response(serializer.data)


@api_view(['GET'])
#@permission_classes([]) fazer permissões só superuser
def verCandidatos(request):
    candidato = Candidato.objects.all()
    serializer = CandidatoSerializerAdmin(candidato, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
#@permission_classes([]) fazer permissões só superuser
def deleteCandidato(request, candidato_id):
    candidato = Candidato.objects.get(pk=candidato_id)
    user = User.objects.get(pk=candidato.user_id)
    candidato.delete()
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])  # (2)
#@permission_classes([IsAuthenticated])
def empresa(request, empresa_id):
    if request.method == 'GET':  # (3)
        empresa = Empresa.objects.get(pk=empresa_id)
        serializer = EmpresaSerializer(empresa)
        return Response(serializer.data)

    elif request.method == 'POST':  # (3)
        serializer = EmpresaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

    return Response(status=status.HTTP_201_CREATED)

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
        return Response({'message': 'Logged in successfully'})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})