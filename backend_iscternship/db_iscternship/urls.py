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
 path('deleteEmpresa/<int:empresa_id>', views.deleteEmpresa),
 path('verCandidatos/', views.verCandidatos),
 path('verEmpresas/', views.verEmpresas),
 path('empresa/<int:empresa_id>', views.empresa),
 path('vagasAdmin/', views.vagasAdmin),

 # Candidato
 path('vagas/', views.vagasCandidato),
 path('extractTextFromPDF/<path:pdf_path>', views.extract_text_from_pdf),
 path('candidaturasCandidato/<int:candidato_id>/', views.canditurasCandidato),
 path('criarReview/<int:candidato_id>/<int:empresa_id>', views.criar_review),
 path('reviews/<int:empresa_id>', views.reviews),
 path('criarCandidatura/<int:candidato_id>/<int:vaga_id>', views.criarCandidatura),


 # Empresa
 path('vagasEmpresa/<int:empresa_id>/', views.verVagasEmpresa),
 path('criarVagaEmpresa/<int:user_id>/', views.criarVagaEmpresa),
 path('removerVaga/<int:vaga_id>/', views.removerVagaEmpresa),
 path('editarVaga/<int:vaga_id>/', views.editarVagaEmpresa),
 path('candidatosPorVaga/<int:vaga_id>/', views.candidatosPorVaga),
 path('atualizarEstadoCandidatura/<int:candidatura_id>/', views.atualizarEstadoCandidatura),



]