# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class QuestionPapers(models.Model):
    coursename = models.CharField(max_length=15)
    subject = models.CharField(max_length=20)
    semister = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    files = models.FileField(upload_to='file/',null=True)

    def __str__(self):
        return self.coursename


class Note(models.Model):
    coursename = models.CharField(max_length=20)
    subject =models.CharField(max_length=15,null=True)
    semester = models.IntegerField(default=1,validators=[MaxValueValidator(8), MinValueValidator(1)])
    file = models.FileField(upload_to='notes/',null=True)

    def __str__(self):
        return self.coursename

class Syllabus(models.Model):
    coursename = models.CharField(max_length=20)
    file = models.FileField(upload_to='syllabus/',null=True)

    def __str__(self):
        return self.coursename

class Feedback(models.Model):
    name = models.CharField(max_length = 25)
    branchname = models.CharField(max_length = 30, null = True)
    # occupation = models.CharField(max_length = 50, null = True)
    email = models.EmailField(max_length = 30)
    feedback = models.CharField(max_length = 500)
    
    def __str__(self):
        return self.name