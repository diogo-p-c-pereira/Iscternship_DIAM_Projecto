from rest_framework import serializers
from .models import *

class CandidatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidato
        fields = ('user.username', 'user.first_name', 'user.last_name', 'user.email', 'descricao')

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ('user.username', 'user.first_name', 'user.last_name', 'user.email', 'nome_empresa', 'morada')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('candidato.user', 'empresa.user', 'commentario', 'data')
