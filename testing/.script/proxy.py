from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for your app

@app.route('/get_texture/<uuid>')
def get_texture(uuid):
    mojang_url = f"https://sessionserver.mojang.com/session/minecraft/profile/{uuid.replace('-', '')}"
    response = requests.get(mojang_url)
    
    if response.status_code == 200:
        return response.text, 200, {'Content-Type': 'application/json'}
    else:
        return jsonify(error="Error fetching texture data"), 500

if __name__ == '__main__':
    app.run()