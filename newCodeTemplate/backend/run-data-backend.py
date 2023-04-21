#!/usr/bin/env python
# -*- coding: utf-8 -*-

from app import app
from gevent.pywsgi import WSGIServer

http_server = WSGIServer(('0.0.0.0', 5010), app)
http_server.serve_forever()


