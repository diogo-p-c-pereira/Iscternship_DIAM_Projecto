from django.urls import path
from . import views
app_name ='db_iscternship'

urlpatterns = [
 # Login , Logout, Signup
 path("signupCandidato/", views.signupCandidato),
 path("signupEmpresa/", views.signupEmpresa),
 path("login/", views.login_view),
 path("logout/", views.logout_view),

 path('candidato/<int:candidato_id>', views.candidato),
 path('candidatoAdmin/<int:candidato_id>', views.candidatoAdmin),
 path('deleteCandidato/<int:candidato_id>', views.deleteCandidato),
 path('verCandidatos/', views.verCandidatos),
 path('empresa/<int:empresa_id>', views.empresa),

 # Candidato
 path('vagas/', views.vagasCandidato),


 # Empresa
 path('vagasEmpresa/<int:empresa_id>/', views.verVagasEmpresa),
 path('criarVagaEmpresa/<int:user_id>/', views.criarVagaEmpresa),
 path('removerVaga/<int:vaga_id>/', views.removerVagaEmpresa),
 path('editarVaga/<int:vaga_id>/', views.editarVagaEmpresa),

]