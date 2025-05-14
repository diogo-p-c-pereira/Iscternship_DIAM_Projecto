from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class UserSerializerAdmin(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'last_login', 'date_joined', 'is_staff', 'is_superuser')

class CandidatoSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Candidato
        fields = '__all__'

class CandidatoSerializerAdmin(serializers.ModelSerializer):
    user = UserSerializerAdmin()
    class Meta:
        model = Candidato
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Empresa
        fields = '__all__'

class EmpresaSerializerAdmin(serializers.ModelSerializer):
    user = UserSerializerAdmin()
    class Meta:
        model = Empresa
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        
        
class VagaSerializer(serializers.ModelSerializer):
    empresa = EmpresaSerializer()
    class Meta:
        model = Vaga
        fields = '__all__'

class CandidaturaSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Candidatura
        fields = '__all__'

class ReportßSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

