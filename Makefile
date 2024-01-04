dev:
	bun run dev
build:
	docker build -t telegram-publisher .
run:
	docker run -d -p 3001:3000 --name telegram-publisher --rm telegram-publisher
