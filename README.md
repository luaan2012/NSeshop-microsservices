## NerdStore distributed systems/microservices

My first complicated project with a lot of business rules that apply in ecommerce these days.

## :books: Notes

- Technologies used: EasyNetQ, FluentValidation, Poly, NetDevPack, MoreLinq, GRPc, EF, MediaTR, Dapper, JWT and REFIT.
- Link Template: <a href="https://technext.github.io/cozastore/">

## :bulb: Install

- First, enter the "sql" folder in the root of the project, you can create a local database, lite or any other with the "AllData.sql" file that has all the products previously started.
Note that all API's use their own context (EF) and if you create a local db, not empty, I have provided a file called "product.sql" to fill the products table.

- Second, change all the connections strings in the "appsettings" of all the API's in the project under development.

- Third, start all API's with MVC project in sequence as example below.

- Fourth, as the project uses RabbitMQ with a docker image, you will need to have docker installed on your machine to run the project in its entirety, because some APIs as soon as they are started will subscribe to the queues. Then after installing, run the following command:

docker run -d --hostname rabbit-host --name rabbit-nerdstore -p 15672:15672 -p 5672:5672 rabbitmq:management

## :whale: Docker

To run any project in docker, follow the steps below:

- First, we need to install a certificate issued from IIS.
Enter the "docker" folder and then the "certs" folder and double click to install the certificate.
Choose between "current user" or "local machine" and click next, then next again. The password is "nerdstore", 
type it and click next. On the next screen, choose the option "place all certificates" and then select the folder 
"Trusted Root Certification Authorites" so that it is recognized as a valid certificate in your local machine.

- Second, now with the certificate installed, in the docker folder, let's open a command prompt (CMD) and run the following command:

docker-compose -f nerdstore_production.yml up 

NOTE: Please note that to run on docker we are looking at the appsettings.Production. And for docker, I decided to upload a db in a container, but you can change this in the appsettings.Production by putting the command in the connection string: host.docker.internal\\"YOUR server db"

Example: "DefaultConnection": "Server=host.docker.internal\\MySQL;Database=NerdStore;Trusted_Connection=True;MultipleActiveResultSets=true;User Id=teste;Password=teste"

- Third, if all the steps so far were successful, I think we will be able to run the project with the certificate without any problems, just check that all the containers have uploaded without errors.

