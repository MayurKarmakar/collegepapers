# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets,permissions
from . import models
from . import serializers
from rest_framework.parsers import JSONParser,FormParser,MultiPartParser,FileUploadParser
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action,api_view
from rest_auth.registration.views import RegisterView







#Create your views here.
class QuestionPapers(viewsets.ModelViewSet):
    queryset = models.QuestionPapers.objects.all()
    serializer_class = serializers.QuestionPaperSerializer
    parser_classes = [JSONParser,FormParser,MultiPartParser,FileUploadParser]
    permission_classes = [
        permissions.AllowAny
    ]

    # def list(self, request):
    #     queryset = models.QuestionPapers.objects.all()
    #     serializer = serializers.QuestionPaperSerializer(queryset, many=True)

    #     response = Response(serializer.data)
    #     response['Content-Disposition'] = "attachement; filename = 'test.pdf'"
    #     return response

class SyllabusView(viewsets.ModelViewSet):
    queryset = models.Syllabus.objects.all()
    serializer_class = serializers.SyllabusSerializer
    parser_classes = [JSONParser,FormParser,MultiPartParser,FileUploadParser]
    permission_classes = [
        permissions.AllowAny
    ]

class NotesView(viewsets.ModelViewSet):
    queryset = models.Note.objects.all()
    serializer_class = serializers.NoteSerializer
    parser_classes = [JSONParser,FormParser,MultiPartParser,FileUploadParser]
    permission_classes = [
        permissions.AllowAny
    ]
class FeedbackView(viewsets.ModelViewSet):
    queryset = models.Feedback.objects.all()
    serializer_class = serializers.FeedbackSerializer
    parser_classes = [JSONParser,FormParser,MultiPartParser,FileUploadParser]
    permission_classes = [
        permissions.AllowAny
    ]

class CustomRegistrationView(RegisterView):
  serializer_class = serializers.RegisterSerializer

#   def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

  def save(self, request):
        serializer = serializers.RegisterSerializer(data = request.data)

        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)