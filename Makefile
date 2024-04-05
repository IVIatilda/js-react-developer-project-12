install:
	npm install; npm install --prefix frontend

start-frontend:
	npm run start --prefix frontend

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	npm run start

build:
	npm run build