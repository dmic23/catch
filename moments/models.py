from __future__ import unicode_literals
from django.db import models
from nonce import settings
from time import time
from users.models import User

def get_upload_file_name(instance, filename):
    return settings.UPLOAD_FILE_PATTERN % (str(time()).replace('.','_'), filename)

class Moment(models.Model):

    image = models.FileField(upload_to=get_upload_file_name, null=True, blank=True)
    user_moment = models.ForeignKey(User, related_name='moment_user')
    caption = models.TextField(blank=True, null=True)
    tagged_nonce = models.ManyToManyField(User, blank=True)
    moment_lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    moment_lng = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    loc_name = models.CharField(max_length=240, blank=True, null=True)
    loc_id = models.CharField(max_length=240, blank=True, null=True)
    loc_vicinity = models.CharField(max_length=240, blank=True, null=True)
    moment_created = models.DateTimeField(auto_now_add=True)
    moment_removed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-moment_created']

    def __unicode__(self):
        return str(self.user_moment)

class MomentLike(models.Model):

    moment = models.ForeignKey(Moment, related_name='moment_like')
    liked_by = models.ForeignKey(User, related_name='like_user')
    moment_liked = models.BooleanField(default=False)
    liked_date = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return str(self.liked_date)

class MomentComment(models.Model):

    moment = models.ForeignKey(Moment, related_name='moment_comment')
    comment_by = models.ForeignKey(User, related_name='comment_user')
    comment = models.TextField()
    comment_date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return str(self.comment_date)
