cd src/database

printf 'y' | prisma reset

prisma import --data seeds.zip