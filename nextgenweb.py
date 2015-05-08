from flask import Flask, render_template, request, jsonify
from celery import Celery
import simplejson as json
from datetime import datetime

app = Flask(__name__)

celery = Celery('tasks', backend='amqp', broker='amqp://queue_user:N0Reurn@app1.easternlabs.us/app1')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search/', methods=['POST', 'GET'])
def search():
    results = []
    if request.form.get('search_input') != None:
        search_input = request.form.get('search_input')
        foo = celery.send_task("tasks.search", [search_input])
        results = foo.get()
    return render_template('search.html', results=results)

def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj

@app.route('/angular-search/<searchterms>', methods=['POST', 'GET'])
def api_search(searchterms):
    foo = celery.send_task("tasks.search", [searchterms])
    results = foo.get()
    # return jsonify({'results': results})
    return json.dumps(results, default=date_handler)

if __name__ == '__main__':
   app.run(debug=True)