"""urlconf for the base application"""

from django.conf.urls import url, patterns
from django.contrib.auth import views as auth_views


urlpatterns = patterns('base.views',
    url(r'^$', 'home', name='home'),
    url(r'^login$', auth_views.login),
    url(r'^logout$', auth_views.logout),

)
