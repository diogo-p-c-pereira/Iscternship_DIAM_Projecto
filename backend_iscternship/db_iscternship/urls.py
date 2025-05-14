from django.urls import path
from . import views
app_name ='db_iscternship'

urlpatterns = [
 path('api/candidato/<int:candidato_id>', views.candidato),
 path('api/candidatoAdmin/<int:candidato_id>', views.candidatoAdmin),
 path('api/deleteCandidato/<int:candidato_id>', views.deleteCandidato),
 path('api/verCandidatos/', views.verCandidatos),
 path('api/empresa/<int:empresa_id>', views.empresa),
 path('api/verVaga/<int:vaga_id>', views.verVaga),
 path("signupCandidato/", views.signupCandidato),
 path("signupEmpresa/", views.signupEmpresa),
 path("login/", views.login_view),
 path("logout/", views.logout_view),
]