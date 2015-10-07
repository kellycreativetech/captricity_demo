""" Default urlconf for captricity """

from django.conf.urls import include, patterns, url
from django.contrib import admin
admin.autodiscover()
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('base.urls')),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

