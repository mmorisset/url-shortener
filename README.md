# README



## Developement:

Copy .env.sample file into .env file

### Avec Docker

- Install docker desktop for mac

- Run:
```
docker-compose build
docker-compose up
```

### Sans Docker

- Install dependancies and make sure they are runnning:
  - postgres
  - redis
  - elastic-search
  - yarn


Run:
```
gem install bundler
bundle
yarn install
rails s
```


## Testing

- Run serveur:
```
CYPRESS=1 rails s -p 5017
```

- Run Cypress:
```
yarn cypress open
```
