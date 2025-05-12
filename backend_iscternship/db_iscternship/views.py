from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(['GET', 'POST'])  # (2)
@permission_classes([IsAuthenticated])
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