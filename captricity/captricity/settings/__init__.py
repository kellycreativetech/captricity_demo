""" Settings for captricity """

from .base import *
try:
    from .local import *
except ImportError as exc:
    print "No local settings found"
    #exc.args = tuple(
    #    ['%s (did you rename settings/local-dist.py?)' % exc.args[0]])
    #raise exc
