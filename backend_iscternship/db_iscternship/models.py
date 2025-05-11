from django.db import models

# Create your models here.


class Candidato(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    descricao = models.TextField()

class Empresa(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    morada = models.CharField(max_length=100)

class Review(models.Model):
    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    comentario = models.TextField()
    data = models.DateTimeField(auto_now_add=True)

class Vaga(models.Model):
    class Estado_Vaga(models.TextChoices):
        AB = "Aberta"
        FE = "Fechada"

    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    estado = models.CharField(max_length=20, choices=Estado_Vaga.choices, default=Estado_Vaga.AB)
    isReportada = models.BooleanField(default=False)

class Candidatura(models.Model):
    class Estado_Candidatura(models.TextChoices):
        PEND = "Pendente"
        PROC = "Em Processamento"
        ACEP = "Aceite"
        REJE = "Rejeitada"

    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE)
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE)
    estado = models.CharField(choices=Estado_Candidatura.choices, default=Estado.PEND, max_length=20)
    data_envio = models.DateTimeField(auto_now_add=True)
    feedback_empresa = models.TextField()

class Report(models.Model):
    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE)
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE)
    motivo = models.TextField()
    data = models.DateTimeField(auto_now_add=True)





