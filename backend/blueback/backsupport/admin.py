# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from . import models
# Register your models here.

class NotesModelAdminView(admin.ModelAdmin):
    list_display = ('coursename', 'subject', 'semester','file')
    list_filter = ('coursename',)

admin.site.register(models.QuestionPapers)
admin.site.register(models.Note, NotesModelAdminView)
admin.site.register(models.Syllabus)
admin.site.register(models.Feedback)