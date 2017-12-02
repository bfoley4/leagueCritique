# imports
import requests
import json
from firebase import firebase

# league api
def request_summoner(region, summoner_name, api_key):
    url = 'https://' + region + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + summoner_name + '?api_key=' + api_key
    response = requests.get(url)
    return response.json()


def request_summoner_data(region, summoner_id, api_key):
    url = 'https://' + region + '.api.riotgames.com/lol/league/v3/positions/by-summoner/' + summoner_id + '?api_key=' + api_key
    response = requests.get(url)
    return response.json()


def request_champion_data(region, summoner_id, api_key):
    url = 'https://' + region + '.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' + summoner_id + '?api_key=' + api_key
    response = requests.get(url)
    return response.json()

# firebase
firebase = firebase.FirebaseApplication('https://cs4830final.firebaseio.com', None)

def get_summoners():
    summoners = firebase.get('/summoner', None)
    return summoners

def insert_data(summoner_name, fav_champions, summoner_data):
    summoner = firebase.get('/summoner/' + summoner_name, None)
    with open('champions.txt', 'r') as file:
        champion_list = json.load(file)
    fav_champions_names = match_champion_id(fav_champions, champion_list)
    if summoner['championData'] == 'None':
        firebase.post('/summoner/' + summoner_name + '/championData', fav_champions)
    if summoner['summonerData'] == 'None':
        firebase.post('/summoner/' + summoner_name + '/summonerData', summoner_data)
        i = 0
        for champion_data in summoner['championData']:
            for fav_champion in summoner['championData'][i]:
                data_ref = firebase.get('/summoner/' + summoner_name + '/championData/', None)
                champion_key = 0
                for key, value in data_ref.iteritems():
                    champion_key = key
                if champion_key is not 0 and i < 3:
                    firebase.post('/summoner/' + summoner_name + '/championData/' + champion_key + '/' + str(i) + '/championName', fav_champions_names[i])
            i += 1

def match_champion_id(fav_champions, champion_list):
    fav_champions_names = []
    for fav_champion in fav_champions:
        for champion in champion_list['data']:
            if fav_champion['championId'] == champion_list['data'][str(champion)]['id']:
                fav_champions_names.append(champion)
    return fav_champions_names

def insert_comment(summoner_name, user, text):
    firebase.post('/summoner/' + summoner_name + '/comments/' + user, text)