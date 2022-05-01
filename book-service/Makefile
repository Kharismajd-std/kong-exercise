.PHONY : build run-docker clean

build:
	docker build -t book-service-kong .

run-docker:
	docker run -d --rm --name book-service-kong \
	--network=kong-net \
	-p 8004:8004 \
	book-service-kong

clean:
	docker rmi -f book-service-kong