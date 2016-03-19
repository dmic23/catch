# -*- coding: utf-8 -*-
from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers, status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from allauth.socialaccount.models import SocialAccount
from users.models import User


class SocialUserSerializer(serializers.ModelSerializer):

    uid = serializers.CharField(read_only=True)
    provider = serializers.CharField(read_only=True)

    class Meta:
        model = SocialAccount
        fields = ('id', 'uid', 'provider', 'extra_data', 'last_login', 'date_joined',)
        

class FollowSerializer(serializers.ModelSerializer):

    # social_acct = SocialUserSerializer(many=True)
    fb_data = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'is_active', 'email', 'username', 'first_name', 'last_name', 'fb_data',)

    def get_fb_data(self, obj):

        fb_uid = SocialAccount.objects.filter(user=obj.id, provider='facebook')

        if len(fb_uid):
            fb_data = {'fb_id':fb_uid[0].uid, 'fb_pic':"http://graph.facebook.com/%s/picture?width=40&height=40" %str(fb_uid[0].uid)}
            return fb_data
        # else:
        #     return fb_data = {'fb_id':Null, 'fb_pic':"/static/build/development/media/uploads/blank_user.png")}


class UserSerializer(serializers.ModelSerializer):

    social_acct = SocialUserSerializer(many=True)
    following = FollowSerializer(many=True, read_only=True, required=False)
    username = serializers.CharField(required=False)
    fb_data = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'is_active', 'user_created', 'user_updated', 'email', 'username', 'first_name', 'last_name', 'fb_data', 'following', 'social_acct',)

    def get_fb_data(self, obj):
        fb_uid = SocialAccount.objects.filter(user=obj.id, provider='facebook')

        if len(fb_uid):
            fb_data = {'fb_id':fb_uid[0].uid, 'fb_pic':"http://graph.facebook.com/%s/picture?width=40&height=40" %str(fb_uid[0].uid)}
            return fb_data
        else:
            return "/static/build/development/media/uploads/blank_user.png"

