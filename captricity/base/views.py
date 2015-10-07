""" Views for the base application """

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from captools.api import Client
from django.conf import settings
import captools.api
import json


def home(request):
    """ Default view for the root """
    if request.user.is_authenticated():
        return redirect('/dash')
    return render(request, 'base/home.html')


@login_required
def dash(request):
    return render(request, 'dash.html')


ACCEPTABLE_METHODS = [
    'read_batches',
    'read_documents',
]


@login_required
def api_proxy(request):
    client = Client(settings.CAPTRICITY_APPLICATION_TOKEN)

    req = json.loads(request.body)

    method = getattr(client, req['method'], None)
    resp = method(*req.get('args', []))

    return HttpResponse(json.dumps(resp), content_type='application/json')