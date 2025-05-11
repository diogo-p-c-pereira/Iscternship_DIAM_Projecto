from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *

# Create your views here.


@api_view(['GET', 'POST'])  # (2)
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