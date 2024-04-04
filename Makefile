install:
	npm install; npm install --prefix frontend

start-frontend:
	npm run start --prefix frontend

start-old-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

old-start:
	make start-backend & make start-frontend

start:
	npm run start

build:
	npm run build