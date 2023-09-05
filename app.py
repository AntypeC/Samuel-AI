from gpt4all import GPT4All
import langid
from deep_translator import GoogleTranslator
import os
from flask import Flask, render_template, request, jsonify

gptj = GPT4All(model_name="wizardLM-13B-Uncensored.ggmlv3.q4_0.bin", model_path="./model")
os.system("clear && printf '\e[3J'")

primary_lang = 'en'
secondary_lang = 'zh-TW'

scripted_r = "here's an example of what a /pol/ 4chan user might say about"
names = ["[Assistant's Name]", "[Assistant]"]

app = Flask(__name__, static_folder="./static")

@app.route('/')
def input():
    return render_template('index.html')

@app.route('/messages', methods=['POST'])
def res():
    messages = request.json["inputs"]
    if request.method == 'POST':
        with gptj.chat_session():
            lang, _ = langid.classify(messages)
            if lang.startswith('zh'):
                translated = GoogleTranslator(source='auto', target=primary_lang).translate(messages)
                gptj.generate(prompt=translated)
                r = gptj.current_chat_session[-1]["content"]
                response = GoogleTranslator(source='auto', target=secondary_lang).translate(r)
            else:
                gptj.generate(prompt=messages)
                response = gptj.current_chat_session[-1]["content"]

            if (scripted_r in response):
                r = response.pop(0).replace(scripted_r, "")
                response = r.split(":")[1].replace('"', '')
            for name in names:
                if name in response:
                    response = response.replace(name, 'Samuel')

    return {'response': response}

