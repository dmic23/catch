import json
from django.shortcuts import render
from rest_framework import permissions, status, viewsets
from rest_framework.parsers import FileUploadParser, JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from moments.models import Moment, MomentComment, MomentLike
from moments.serializers import MomentSerializer, CommentSerializer, LikeSerializer

class MomentViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Moment.objects.all()
    serializer_class = MomentSerializer

    def perform_create(self, serializer):

        if serializer.is_valid():
            if 'image' in self.request.data:
                req_image = self.request.data.pop('image')
                image = serializer.validated_data.pop('image')

                serializer.save(user_moment=self.request.user, image=image, **self.request.data)


class CommentViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = MomentComment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):

        if serializer.is_valid():
            moment_id = self.request.data.pop('moment')
            moment = Moment.objects.get(id= moment_id)

            serializer.save(comment_by=self.request.user, moment=moment, **self.request.data)

class LikeViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = MomentLike.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):

        if serializer.is_valid():
            print "SELF.REQ.DATA === %s" % self.request.data
            print "SER.VAL_DATA === %s" % serializer.validated_data
            moment_id = self.request.data.pop('moment')
            moment = Moment.objects.get(id=moment_id)
            print "MOMENT == %s" %moment.moment_like.all()

            serializer.save(liked_by=self.request.user, moment=moment, **self.request.data)

    def perform_update(self, serializer):

        if serializer.is_valid():
            print "LIKE UPD SELF === %s " %self
            print "LIKE UPD SER = %s " % serializer
            moment_id = self.request.data.pop('moment')
            moment = Moment.objects.get(id=moment_id)

            serializer.save(liked_by=self.request.user, moment=moment, **self.request.data)





