import requests
import urllib.request

api_url = 'https://pokeapi.co/api/v2/pokemon/'

for id in range(1, 152):
  print(f'Loading pokemon {id}')
  response = requests.get(f"{api_url}{id}")
  pokemon = response.json()
  urllib.request.urlretrieve(pokemon['sprites']['back_default'], f"./src/img/{pokemon['species']['name']}-back.png")
  urllib.request.urlretrieve(pokemon['sprites']['front_default'], f"./src/img/{pokemon['species']['name']}-front.png")