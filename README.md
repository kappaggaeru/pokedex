# Pokedex
This is side project about Pokémon, the whole idea is to practice and learn how to work around with React, all the data is provided by https://pokeapi.co/
## Endpoints
The application uses the following endpoints to show, list and filter the Pokémon
### Pokemon
The return of this endpoint is the total count of them, and example of to call the endpoint with extra parameters and a result list with name and id for each one them
>https://pokeapi.co/api/v2/pokemon/
```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    }
    ...
  ]
}
```
#### Full Data
A complete objetc with all the data from a Pokémon can be found in the next endpoint, a name or an id can be passed as a parameter, this dual way of searching allows to search pokémon using their names
>https://pokeapi.co/api/v2/pokemon/1

The response is too large to be displayed in this file but the primary properties are the following:
* Abilities
* Forms
* Height
* Id
* Default indicator
* Moves
* Species

## Filters
The Pokémon can be filtered by the next properties:
* Color
* Egg group
* Habitat
* Shape
* Type
### Egg group
Pokémon are born from eggs and there are several kind of eggs, this next endpoint provides a full list with all the egg kinds
>https://pokeapi.co/api/v2/egg-group
```json
{
  "count": 15,
  "next": null,
  "previous": null,
  "results": [
    {
      "name": "monster",
      "url": "https://pokeapi.co/api/v2/egg-group/1/"
    },
    {
      "name": "water1",
      "url": "https://pokeapi.co/api/v2/egg-group/2/"
    },
    {
      "name": "bug",
      "url": "https://pokeapi.co/api/v2/egg-group/3/"
    },
    ...
  ]
}
```
>https://pokeapi.co/api/v2/egg-group/1
```json
{
  "id": 1,
  "name": "monster",
  "names": [
    {
      "language": {
        "name": "ja-Hrkt",
        "url": "https://pokeapi.co/api/v2/language/1/"
      },
      "name": "かいじゅう"
    },
    {
      "language": {
        "name": "ko",
        "url": "https://pokeapi.co/api/v2/language/3/"
      },
      "name": "괴수"
    },
    ...
  ],
  "pokemon_species": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
    },
    ...
  ]
}
```
### Color
A list with all the primary colors of the Pokémon
>https://pokeapi.co/api/v2/pokemon-color
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "name": "black",
      "url": "https://pokeapi.co/api/v2/pokemon-color/1/"
    },
    {
      "name": "blue",
      "url": "https://pokeapi.co/api/v2/pokemon-color/2/"
    },
    {
      "name": "brown",
      "url": "https://pokeapi.co/api/v2/pokemon-color/3/"
    },
    ...
  ]
}
```
>https://pokeapi.co/api/v2/pokemon-color/1
```json
{
  "id": 1,
  "name": "black",
  "names": [
    {
      "language": {
        "name": "ja-Hrkt",
        "url": "https://pokeapi.co/api/v2/language/1/"
      },
      "name": "くろいろ"
    },
    {
      "language": {
        "name": "ko",
        "url": "https://pokeapi.co/api/v2/language/3/"
      },
      "name": "검정"
    },
    {
      "language": {
        "name": "zh-Hant",
        "url": "https://pokeapi.co/api/v2/language/4/"
      },
      "name": "黑色"
    },
    ...
  ],
  "pokemon_species": [
    {
      "name": "snorlax",
      "url": "https://pokeapi.co/api/v2/pokemon-species/143/"
    },
    {
      "name": "murkrow",
      "url": "https://pokeapi.co/api/v2/pokemon-species/198/"
    },
    {
      "name": "unown",
      "url": "https://pokeapi.co/api/v2/pokemon-species/201/"
    },
    ...
  ]
}
```
### Habitat
>https://pokeapi.co/api/v2/pokemon-habitat
```json
{
  "count": 9,
  "next": null,
  "previous": null,
  "results": [
    {
      "name": "cave",
      "url": "https://pokeapi.co/api/v2/pokemon-habitat/1/"
    },
    {
      "name": "forest",
      "url": "https://pokeapi.co/api/v2/pokemon-habitat/2/"
    },
    {
      "name": "grassland",
      "url": "https://pokeapi.co/api/v2/pokemon-habitat/3/"
    },
    ...
  ]
}
```
>https://pokeapi.co/api/v2/pokemon-habitat/4
```json
{
  "id": 4,
  "name": "mountain",
  "names": [
    {
      "language": {
        "name": "fr",
        "url": "https://pokeapi.co/api/v2/language/5/"
      },
      "name": "montagnes"
    },
    {
      "language": {
        "name": "es",
        "url": "https://pokeapi.co/api/v2/language/7/"
      },
      "name": "montaña"
    },
    {
      "language": {
        "name": "en",
        "url": "https://pokeapi.co/api/v2/language/9/"
      },
      "name": "mountain"
    }
  ],
  "pokemon_species": [
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
    },
    {
      "name": "mankey",
      "url": "https://pokeapi.co/api/v2/pokemon-species/56/"
    },
    {
      "name": "machop",
      "url": "https://pokeapi.co/api/v2/pokemon-species/66/"
    },
    ...
  ]
}
```
### Shape
>https://pokeapi.co/api/v2/pokemon-shape
```json
{
  "count": 14,
  "next": null,
  "previous": null,
  "results": [
    {
      "name": "ball",
      "url": "https://pokeapi.co/api/v2/pokemon-shape/1/"
    },
    {
      "name": "squiggle",
      "url": "https://pokeapi.co/api/v2/pokemon-shape/2/"
    },
    {
      "name": "fish",
      "url": "https://pokeapi.co/api/v2/pokemon-shape/3/"
    },
    ...
  ]
}
```
>https://pokeapi.co/api/v2/pokemon-shape/9
###
>
```json
{
  "awesome_names": [
    {
      "awesome_name": "Alaire",
      "language": {
        "name": "fr",
        "url": "https://pokeapi.co/api/v2/language/5/"
      }
    },
    {
      "awesome_name": "Alar",
      "language": {
        "name": "en",
        "url": "https://pokeapi.co/api/v2/language/9/"
      }
    }
  ],
  "id": 9,
  "name": "wings",
  "names": [
    {
      "language": {
        "name": "fr",
        "url": "https://pokeapi.co/api/v2/language/5/"
      },
      "name": "Ailes"
    },
    {
      "language": {
        "name": "en",
        "url": "https://pokeapi.co/api/v2/language/9/"
      },
      "name": "Wings"
    }
  ],
  "pokemon_species": [
    {
      "name": "pidgey",
      "url": "https://pokeapi.co/api/v2/pokemon-species/16/"
    },
    {
      "name": "spearow",
      "url": "https://pokeapi.co/api/v2/pokemon-species/21/"
    },
    {
      "name": "zubat",
      "url": "https://pokeapi.co/api/v2/pokemon-species/41/"
    },
    ...
  ]
}
```
### Type
>https://pokeapi.co/api/v2/type/
```json
{
  "count": 21,
  "next": "https://pokeapi.co/api/v2/type/?offset=20&limit=1",
  "previous": null,
  "results": [
    {
      "name": "normal",
      "url": "https://pokeapi.co/api/v2/type/1/"
    },
    {
      "name": "fighting",
      "url": "https://pokeapi.co/api/v2/type/2/"
    },
    {
      "name": "flying",
      "url": "https://pokeapi.co/api/v2/type/3/"
    },
    ...
  ]
}
```
>https://pokeapi.co/api/v2/type/1/
```json
{
    ...
    "pokemon": [
    {
      "pokemon": {
        "name": "pidgey",
        "url": "https://pokeapi.co/api/v2/pokemon/16/"
      },
      "slot": 1
    },
    {
      "pokemon": {
        "name": "pidgeotto",
        "url": "https://pokeapi.co/api/v2/pokemon/17/"
      },
      "slot": 1
    },
    {
      "pokemon": {
        "name": "pidgeot",
        "url": "https://pokeapi.co/api/v2/pokemon/18/"
      },
      "slot": 1
    },
    ...
    ]
}
```