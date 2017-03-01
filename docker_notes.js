// =====================================================
// docker hub
// https://docs.docker.com/engine/getstarted/step_six/

// mongo
docker run -d --name mongodb -p 27017:27017 mongo

// camp main server and database
docker build -t campmain:dev .

docker tag e54b987e5fa2 yoshiori/campapp:main
docker tag 0dffc7177b06 yoshiori/campapp:db

docker push yoshiori/campapp:main
docker push yoshiori/campapp:db

// Pull your new image
docker pull yoshiori/campapp:main
docker pull yoshiori/campapp:db

// linking containers
docker run -d --name database -p 27017:27017 0dffc7177b06
docker run -d -P --name mainserver --link database:database -p 3000:3000 e26d48e6606d

// docker exec -ti <container-id> /bin/bash
docker exec -ti c76e4fc4d249 /bin/bash
docker commit

// =====================================================
// Docker Compose (Did not use)
// docker compose
// configure docker-compose.yml
// run docker-compose.yml to build containers
docker-compose up
docker-compose up --build
--build // a clean build of our images.

// ========================================================
// Docker Compose On Digital Ocean (Did not use)
// https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-14-04



