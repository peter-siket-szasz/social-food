#!/bin/bash

source ~/socialfood/backend/backendenv/bin/activate

pkill -f bin/gunicorn
gunicorn src.main:app --bind=127.0.0.1:8000 --daemon --access-logfile ~/socialfood/backend/gunicorn_log.log
