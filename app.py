import base64
import os
from flask import Flask, request, render_template, send_file
import requests
# from api import cdn
import io

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload")
def upload_page():
    return render_template("upload.html")

@app.route("/download")
def download_page():
    return render_template("download.html")

# @app.route("/api/download/<path:url>", methods=["GET"])
# def download(url):
#     try:
#         start = request.args.get("start")
#         end = str(int(request.args.get("end"))-1)
#         headers = {'Range': f'bytes={start}-{end}'}
#         if start and end:
#             response = requests.get(cdn.renew_link(url), headers=headers)
#             if response.status_code == 206:
#                 return response.content
#             else:
#                 return (f"Error: {response.status_code} - {response.reason}")
#         else:
#             return "Add start/end arguments!"
#     except:
#         return "Add start/end arguments!"
