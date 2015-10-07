"""urlconf for the base application"""

from django.conf.urls import url, patterns
from django.contrib.auth import views as auth_views


urlpatterns = patterns('base.views',
    url(r'^$', 'home', name='home'),
    url(r'^dash$', 'dash', name='dash'),
    url(r'^api_proxy$', 'api_proxy', name='api_proxy'),
    url(r'^login$', auth_views.login),
    url(r'^logout$', auth_views.logout),
)
