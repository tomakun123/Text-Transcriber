import subprocess

# Run main.py in WordDetector
word_detector_dir = "./../WordDetector/examples/"
word_detector_command = ["python", "main.py"]
subprocess.run(word_detector_command, cwd=word_detector_dir)
wordDetectDone = True
print("wordDetectDone1:", wordDetectDone)

# Run main.py in Text-Transcribe
if wordDetectDone:
    text_transcriber_dir = "./../Text-Transcriber/src/"
    text_transcriber_command = ["python", "main.py"]
    subprocess.run(text_transcriber_command, cwd=text_transcriber_dir)
    transcribeDone = True
    print("transcribeDone1:", transcribeDone)

# Run the MP3 Text to Speech File
'''
if transcribeDone:
    mp3_dir = "./../Text-Transcriber/mp3folder"
    mp3_command = ["python", "mp3listener.py"]
    subprocess.run(mp3_command, cwd=mp3_dir)
    print("mp3fetch")
'''