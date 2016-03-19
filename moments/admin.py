from django.contrib import admin
from moments.models import Moment, MomentLike, MomentComment

class MomentLikeInline(admin.StackedInline):
    model = MomentLike
    extra = 0

class MomentCommentInline(admin.StackedInline):
    model = MomentComment
    extra = 0

class MomentAdmin(admin.ModelAdmin):

    inlines = [
    	MomentLikeInline,
    	MomentCommentInline
    ]
    list_display = ('moment_created', 'user_moment',)
    list_filter = ('moment_created', 'user_moment',)
    ordering = ('-moment_created',)
    filter_horizontal = ()

admin.site.register(Moment, MomentAdmin)
