from django.conf.urls import url
from . import views



from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'app/question-papers', views.QuestionPapers, basename='questionpapers')
router.register(r'app/syllabus', views.SyllabusView, basename='syllabus')
router.register(r'app/notes', views.NotesView, basename='notes')
router.register(r'app/feedbacks',views.FeedbackView, basename='feedback')
urlpatterns = router.urls