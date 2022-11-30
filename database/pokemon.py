import requests
import json

POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/'

class moves:
  def __init__(self, name, accuracy, power, pp, moveType):
    self.name = name
    self.accuracy = accuracy
    self.power = power
    self.pp = pp
    self.moveType = moveType

class pokemon:
  def __init__(self, id):
    self.id = id
    self.getPokemon()

  def getMoves(self, movesList):
    currentMoves = []
    #print(movesList[0]['move']['url'])
    for m in movesList:
      url = m['move']['url']
      # print(type(url))
      response = requests.get(url)
      newMovedb = response.json()
      # print(newMovedb)
      Move = moves(newMovedb['name'], newMovedb['accuracy'], newMovedb['power'], newMovedb['pp'], newMovedb['type']['name'])
      currentMoves.append(Move.__dict__)

    return currentMoves
    

  def getPokemon(self):
    response = requests.get(f"{POKEMON_API_URL}{self.id}")
    pokemon = response.json()
    self.name = pokemon['name']
    self.type = pokemon['types'][0]['type']['name']
    stats = pokemon['stats']
    self.moves = self.getMoves(pokemon['moves'])

    for s in stats:
      name = s['stat']['name']
      if name == 'hp':
        self.hp = s['base_stat']
      elif name == 'defense':
        self.defense = s['base_stat']
      elif name == 'attack':
        self.attack = s['base_stat']
      elif name == 'special-attack':
        self.special_attack = s['base_stat']
      elif name == 'special-defense':
        self.special_defense = s['base_stat']
      elif name == 'speed':
        self.speed = s['base_stat']
    self.id = self.id - 1

list = []
for x in range(1, 152):
  pok = pokemon(x)
  list.append(pok.__dict__)
  print(f'Done {x}')



with open("pokemon-database.json", "w") as outfile:
    outfile.write(json.dumps(list))
