from django.conf.urls import patterns, include, url
from django.contrib import admin
import server.views
import settings

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'SOAweibo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', server.views.home),
    url(r'^search.html', server.views.search),
    url(r'^user.html' ,server.views.user),
    url(r'^weibo.html' , server.views.weibo),
    url(r'^(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_URL, 'show_indexes': True}),
)
