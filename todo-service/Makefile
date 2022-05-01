.PHONY : build run-docker clean

build:
	docker build -t todo-service-kong .

run-docker:
	docker run -d --rm --name todo-service-kong \
	--network=kong-net \
	-p 8003:8003 \
	todo-service-kong

clean:
	docker rmi -f todo-service-kong