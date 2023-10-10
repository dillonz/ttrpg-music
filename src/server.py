import json
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join('..', 'public', 'audio')

@app.route('/save_state', methods=['POST'])
def save_json():
    data = request.get_json()
    # Save the data to a JSON file
    with open('no_reload/sound-db.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)

    return jsonify({'message': 'Data saved successfully'})

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # Ensure the 'uploads' folder exists
        if not os.path.exists(UPLOAD_FOLDER):
            return jsonify({'error': 'No folder exists'})

        # Save the uploaded file
        split = os.path.splitext(file.filename)
        filename = split[0]
        ext = split[1]
        ogFilename = filename
        i = 1
        while (os.path.exists(os.path.join(UPLOAD_FOLDER, filename + ext).replace(" ", "_"))):
            filename = ogFilename + ' ' + str(i)
            i = i + 1
        filename = (filename + ext).replace(" ", "_")
        print(filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify({'message': 'File uploaded successfully', 'name': filename})

@app.route('/delete_audio', methods=['POST'])
def delete_file():
    data = request.get_json()
    print(data)
    filename = os.path.basename(data.get('path'))
    if (os.path.exists(os.path.join(UPLOAD_FOLDER, filename))):
        os.remove(os.path.join(UPLOAD_FOLDER, filename))
    return jsonify({'message': 'Done'})

if __name__ == '__main__':
    app.run()