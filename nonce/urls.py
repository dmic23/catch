from django.conf.urls import include, patterns, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework import routers
from moments.views import MomentViewSet, CommentViewSet, LikeViewSet
from nonce.views import IndexView
from users.views import LogoutView, UserViewSet, FacebookLogin

admin.autodiscover()

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'moments', MomentViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)

urlpatterns = [

    url(r'^api/v1/', include(router.urls)),
    url(r'^$',  IndexView.as_view(), name='index'),    
    url(r'^/$',  IndexView.as_view(), name='index'),

    url(r'^accounts/', include('allauth.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    #url(r'^api/v1/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^admin/', admin.site.urls),
]


# if settings.DEBUG:
#    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)