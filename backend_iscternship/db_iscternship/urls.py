from django.urls import path
from . import views
app_name ='db_iscternship'

urlpatterns = [
 path('api/candidato/<int:candidato_id>', views.candidato),
 path("api/signupCandidato/", views.signupCandidato),
 path("api/signupEmpresa/", views.signupEmpresa),
 path("api/login/", views.login_view),
 path("api/logout/", views.logout_view),
]