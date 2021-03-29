# README



## Developement:



### Sans Docker

Copy .env.sample file into .env file

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
rake db:setup
rails s
```

### Avec Docker

- Copy .env.docker-sample file into .env file

- Uncomment config/initializers/sidekiq.rb

- Install docker desktop for mac

- Run:
```
docker-compose build
docker-compose up
docker-compose exec app bundle exec rake db:setup
```


## Testing


- Migrate test DB
```
RAILS_ENV=test rake db:migrate
```

- Run serveur:
```
CYPRESS=1 rails s -p 5017
```

- Run Cypress:
```
yarn cypress open
```
