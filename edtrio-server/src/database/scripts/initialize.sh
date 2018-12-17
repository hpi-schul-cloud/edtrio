
cd src/database

docker-compose up -d

while [ -z "$(docker ps -a | grep database_prisma_1)" ]
do
    sleep 2
    echo "waiting for docker to start"
done
    
prisma deploy

