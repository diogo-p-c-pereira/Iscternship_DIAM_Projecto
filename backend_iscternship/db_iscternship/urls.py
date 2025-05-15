from django.urls import path
from . import views
app_name ='db_iscternship'

urlpatterns = [
 path('candidato/<int:candidato_id>', views.candidato),
 path('candidatoAdmin/<int:candidato_id>', views.candidatoAdmin),
 path('deleteCandidato/<int:candidato_id>', views.deleteCandidato),
 path('verCandidatos/', views.verCandidatos),
 path('empresa/<int:empresa_id>', views.empresa),
 path('verVaga/<int:vaga_id>', views.verVaga),
 path("signupCandidato/", views.signupCandidato),
 path("signupEmpresa/", views.signupEmpresa),
 path("login/", views.login_view),
 path("logout/", views.logout_view),
]