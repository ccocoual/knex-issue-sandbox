#!/bin/sh
sudo docker start mssql-knex-issue || sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Allo123456' -p 1433:1433 --name mssql-knex-issue -d mcr.microsoft.com/mssql/server:2017-latest;
sleep 15s;
sudo docker exec -it mssql-knex-issue /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'Allo123456' -Q 'DROP DATABASE Database1;CREATE DATABASE Database1';

