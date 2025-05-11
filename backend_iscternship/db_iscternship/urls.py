from django.urls import path
from . import views
app_name ='db_iscternship'

urlpatterns = [
 path('api/candidato/<int:candidato_id>', views.candidato),
]