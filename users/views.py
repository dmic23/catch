# -*- coding: utf-8 -*-
import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.models import User
from users.serializers import UserSerializer, SocialUserSerializer

class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'uid'
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, id=None, uid=None):
        queryset = self.queryset.get(social_acct__uid=uid)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

# class LoginView(views.APIView):

#     def post(self, request, format=None):
#         print "self == %s" %self
#         print "request == %s" %request.data
#         data = request.data

#         email = data['email']
#         print 'EMAIL === %s' %email
#         password = data['password']
#         print 'PASSWORD === %s' %password

#         # data = json.loads(request.body)


#         # email = data.get('email', None)
#         # password = data.get('password', None)

#         if User.objects.filter(email=email, is_active=True).exists():
#             user = User.objects.filter(email=email, is_active=True)
#             print "USER === %s" %user
#             account = authenticate(email=user.email, password=user.password)
#             print "Account == %s" %account
#             if account is not None:
#                 print "Account == %s" %account
#                 if account.is_active:
#                     print "USER login ---- %s" %request.user
#                     login(request, account)
#                     serialized = UserSerializer(account)
#                     return Response(serialized.data)
#                 else:
#                     return Response({
#                         'status': 'Unauthorized',
#                         'message': 'This account has been disabled.'
#                     }, status=status.HTTP_401_UNAUTHORIZED)
#             else:
#                 return Response({
#                     'status': 'Unauthorized',
#                     'message': 'Username or password invalid'
#                 }, status=status.HTTP_401_UNAUTHORIZED)

#         else :
#             # print "DATA == %s" %data
#             serializer = UserSerializer(data=request.data)
#             serializer_class = UserSerializer
#             print "SERE === %s" %serializer
#             print "sere class === %s" %serializer_class
#             # print "SERE valid=== %s" %serializer.is_valid()
#             if serializer.is_valid():
#                 serializer.save(is_active=True, **request.data)
#                 return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
#             else:
#                 return Response({
#                     'status': 'Bad request',
#                     'message': 'Account could not be created with received data.'
#                 }, status=status.HTTP_400_BAD_REQUEST)
#         user.save()
#         print "user == %s" %user


class LogoutView(views.APIView):

    # permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):

        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)