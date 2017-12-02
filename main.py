from flask import Flask, request, render_template
from script import *
import os

#api variables
region = 'kr'
api_key = 'RGAPI-434af45e-35c3-4912-851f-a97a89ddd987'

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def index_post():
    summoner_name = request.form['summoner-name']
    summoner = request_summoner(region, summoner_name, api_key)
    summoner_id = str(summoner['id'])
    summoner_data = request_summoner_data(region, summoner_id, api_key)
    champion_data = request_champion_data(region, summoner_id, api_key)
    fav_champions = champion_data[0:3]
    insert_data(summoner_name, fav_champions, summoner_data)
    return render_template('index.html')
    

@app.route('/summoner/<username>')
def summoner(username):
    return render_template('summoner.html', username='%s' %username)


@app.route('/summoner/<username>', methods=['POST'])
def summoner_post(username):
    text = request.form['comment']
    user = request.form['user']
    insert_comment(username, user, text)
    return render_template('summoner.html', username='%s' %username)


@app.route('/login')
def login():
    return render_template('login.html')
        

if __name__ == "__main__":
    app.run()