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
@permission_classes([IsAuthenticated])
def candidato(request, candidato_id):
    if request.method == 'GET':  # (3)
        candidato = Candidato.objects.get(pk=candidato_id)
        serializer = CandidatoSerializer(candidato)
        return Response(serializer.data)

    #elif request.method == 'POST':  # (3)
     #   serializer = CandidatoSerializer(data=request.data)
#
 #       if serializer.is_valid():
  #          serializer.save()

    return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signupCandidato(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')

    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    candidato = Candidato(user = user, descricao = request.data.get('descricao'))
    candidato.save()
    return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signupEmpresa(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    nome_empresa = request.data.get('nome_empresa')
    morada = request.data.get('morada')

    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email, is_staff= True)
    empresa = Empresa(user = user, nome_empresa = nome_empresa, morada = morada)
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