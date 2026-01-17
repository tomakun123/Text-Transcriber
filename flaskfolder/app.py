from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
import os
import subprocess
# from TextTranscriber.src import main
# from TextTranscriber.src.model import Model, DecoderType
# from TextTranscriber.src.main import char_list_from_file
from flask_cors import CORS
import shutil

app = Flask(__name__)
CORS(app)

def clear_folder(folder_path):
    # Iterate over all the files and subdirectories in the given folder
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        print(file_path)
        print(filename)
        # Check if it's a file
        if os.path.isfile(file_path):
            # Delete the file
            os.remove(file_path)
        else:
            # Delete the subfolder and its contents recursively
            shutil.rmtree(file_path)

def extract_sentence(strings_list):
    # print("strings_list: ", strings_list)
    for string in strings_list:
        # print("string: ", string)
        if string.startswith("sentence="):
            # print("string2: ", string)
            sentence = string[len("sentence="):]
            # print("sentence: ", sentence)
            return sentence

#where the uploaded image is saved, and where the word detector reads from
UPLOAD_FOLDER = 'C:/Users/Thomas M/Desktop/AI_Camp/WordDetector/data/line'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    folder_path = "C:/Users/Thomas M/Desktop/AI_Camp/SeperatedWords"
    folder_path2 = "C:/Users/Thomas M/Desktop/AI_Camp/WordDetector/data/line"
    clear_folder(folder_path2)
    clear_folder(folder_path)

    # Access the uploaded file using the 'request' object
    uploaded_file = request.files['file']

    if uploaded_file:
        # Save the uploaded file to a specific location
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
        uploaded_file.save(file_path)
        streamline_path = './streamline_subprocess.py'
        result = subprocess.run(['python', streamline_path], capture_output=True)
        pre_sentence = result.stdout.decode().split('\r\n')
        print("pre_sentence:", pre_sentence)
        sentence = extract_sentence(pre_sentence)
        print(sentence)
        return jsonify(sentence=sentence)

    else:
        # Return an error response if no file was uploaded
        return 'No file uploaded', 400
  
@app.route('/test', methods=['GET'])
def test():
   return render_template('index.html', sentence='test sentence')

@app.route('/audio', methods=['GET'])
def play_audio():

    audio_file = os.path.join('C:/Users/Thomas M/Desktop/AI_Camp/flaskfolder/TextTranscriber/mp3folder', 'T2S.mp3')
    response = send_file(audio_file, mimetype='audio/mpeg')
    response.headers['Cache-Control'] = 'no-cache'

    return response
    # return send_file('C:/Users/Thomas M/Desktop/AI_Camp/Text-Transcriber/mp3folder/T2S.mp3', as_attachment=False)

if __name__ == '__main__':
    app.run(debug=True, port=81)

