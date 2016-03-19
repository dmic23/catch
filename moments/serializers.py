# -*- coding: utf-8 -*-
from time import time
from decimal import *
import base64, six, uuid
import cStringIO
from django.core.files.base import ContentFile
from rest_framework import serializers, status
from rest_framework.response import Response
from nonce import settings
from moments.models import Moment, MomentComment, MomentLike
from users.models import User
from users.serializers import UserSerializer, SocialUserSerializer

class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):
        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            file_extension = self.get_file_extension(file_name, decoded_file)
            complete_file_name = "%s.%s" % (file_name, file_extension)
            data = ContentFile(decoded_file, name=complete_file_name)

            return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr
        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class CommentSerializer(serializers.ModelSerializer):

    comment_by = UserSerializer(required=False)

    class Meta:
        model = MomentComment
        fields = ('id', 'moment', 'comment', 'comment_by', 'comment_date',)

class LikeSerializer(serializers.ModelSerializer):

    liked_by = UserSerializer(required=False)

    class Meta:
        model = MomentLike
        fields = ('id', 'moment', 'moment_liked', 'liked_by', 'liked_date',)

    def update(self, instance, validated_data):
        print "LIKE UPD SER SELF === %s "%self
        print "LIKE UPD SER instance === %s "%instance
        print "LIKE UPD SER Val data === %s "%validated_data['likeId']
        unlike = MomentLike.objects.get(id=validated_data['likeId'])
        print "UNLIKE === %s" %unlike
        unlike.delete()
        moment = Moment.objects.get(id=validated_data['moment'].id)
        print "MOMEMT LIKE == %s" %moment.moment_like.all()



class MomentSerializer(serializers.ModelSerializer):

    image = Base64ImageField(max_length=None, use_url=True,)
    user_moment = UserSerializer(required=False)
    tagged_nonce = UserSerializer(many=True, required=False)
    moment_comment = CommentSerializer(many=True, required=False)
    moment_like = LikeSerializer(many=True, required=False)
    moment_lat = serializers.CharField(required=False)
    moment_lng = serializers.CharField(required=False)
    username = serializers.CharField(source='user_moment.get_short_name', required=False)

    class Meta:
        model = Moment
        fields = ('id', 'image', 'user_moment', 'username', 'moment_lat', 'moment_lng', 'moment_created', 'moment_removed', 'caption', 'tagged_nonce', 'moment_comment', 'moment_like', 'loc_name', 'loc_id', 'loc_vicinity',)

    def create(self, validated_data):
        if 'tagged' in validated_data:
            tagged = validated_data.pop('tagged')
            print "SER tagged ==- %s" %tagged
        moment = Moment.objects.create(**validated_data)
        if tagged:
            for tag_user in tagged:
                tag = User.objects.get(id=tag_user)
                print "TAG USER === %s" %tag
                moment.tagged_nonce.add(tag)

        moment.save()

        return moment





