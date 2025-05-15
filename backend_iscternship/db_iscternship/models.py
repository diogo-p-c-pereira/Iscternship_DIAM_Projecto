from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Candidato(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    descricao = models.TextField()
    telefone = models.CharField(max_length=12, default=None)
    imagem = models.ImageField(upload_to= 'profile_pics', default='profile_pics/default.png')
    cv = models.FileField(upload_to= 'cv_files', default='cv_files/empty.pdf', null=True, blank=True)


class Empresa(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_empresa = models.CharField(max_length=50)
    morada = models.CharField(max_length=100)
    telefone = models.CharField(max_length=12, default=None)
    is_approved = models.BooleanField(default=True)
    imagem = models.ImageField(upload_to='profile_pics', default='profile_pics/default.png')


class Review(models.Model):
    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    comentario = models.TextField()
    data = models.DateTimeField(auto_now_add=True)



class Vaga(models.Model):
    class EstadoVaga(models.TextChoices):
        AB = "Aberta"
        FE = "Fechada"

    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    estado = models.CharField(max_length=20, choices=EstadoVaga.choices, default=EstadoVaga.AB)
    isReportada = models.BooleanField(default=False)



class Candidatura(models.Model):
    class EstadoCandidatura(models.TextChoices):
        PEND = "Pendente"
        PROC = "Em Processamento"
        ACEP = "Aceite"
        REJE = "Rejeitada"

    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE)
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE)
    estado = models.CharField(choices=EstadoCandidatura.choices, default=EstadoCandidatura.PEND, max_length=20)
    data_envio = models.DateTimeField(auto_now_add=True)
    feedback_empresa = models.TextField()
    cv = models.FileField(upload_to='cv_files', default='cv_files/empty.pdf', null=True, blank=True)



class Report(models.Model):
    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE)
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE)
    motivo = models.TextField()
    data = models.DateTimeField(auto_now_add=True)
