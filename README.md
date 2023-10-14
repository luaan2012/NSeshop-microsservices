## NerdStore distributed systems/microservices

My first complicated project with a lot of business rules that apply in ecommerce these days.

## :books: Notes

- Technologies used: EasyNetQ, FluentValidation, Polly, NetDevPack, MoreLinq, gRPC, EF (Entity Framework), MediatR, Dapper, JWT (JSON Web Tokens), Docker, NGINX, and Refit.
- I initially used a template and made extensive modifications. <a href="https://themewagon.com/themes/free-html5-ecommerce-website-template/">Template</a>
- The idea for this project stemmed from a <a href="https://desenvolvedor.io/">Course</a> I took, which I highly recommend, titled ".NET Core Enterprise Applications.
- To enable gRPC functionality, the project needs to be self-hosted.

## :bulb: Live Demo

- .Net = [here](<https://nerdstorecore.portfolioluan.shop/>).
- Angular = [here](<https://nerdstoreangular.portfolioluan.shop/>).
- NextJs = [here](<https://nerdstorenext.portfolioluan.shop/>).

## :bulb: Installation Instructions

- First, navigate to the "sql" folder in the project's root directory. Here, you can create a local database using SQLite or any other database management system. Use the "AllData.sql" file, which contains all the pre-existing products. Note that each API has its own context (EF), so if you choose to create a local database that is not empty, I've included a file called "Products.sql" to populate the products table.

1 - Second, update all connection strings in the "appsettings" files of all APIs within the development project.

2 - As the project utilizes RabbitMQ with a Docker image, you'll need to have Docker installed on your machine to run the project in its entirety. Some APIs will subscribe to queues as soon as they're launched. After installing Docker, execute the following command:

3 - docker run -d --hostname rabbit-host --name rabbit-nerdstore-Dev -p 15672:15672 -p 5672:5672 rabbitmq:management
  
4 - To start all projects, right-click on the solution and select "Properties." Choose "Multiple Startup Projects" and ensure that the WEBMVC project is always placed at the bottom.

![image](https://user-images.githubusercontent.com/100293387/210110996-b3406de6-d947-4543-94e6-18b074863de4.png)

## :whale: Running with Docker

To run any project using Docker, follow these steps:

- First, you need to install a certificate issued by IIS.
  - Navigate to the "docker" folder and then the "certs" folder.
  - Double-click to install the certificate.
  - Choose between "current user" or "local machine" and click "Next."
  - The password is "nerdstore," so type it and click "Next."
  - On the next screen, select the option "Place all certificates in the following store."
  - Choose the "Trusted Root Certification Authorities" folder so that the certificate is recognized as valid on your local machine.

![image](https://user-images.githubusercontent.com/100293387/210111346-eba75c55-4283-435f-802d-06b5ce058495.png)

- Second, now that the certificate is installed, navigate to the "docker" folder and open a command prompt (CMD).

 - Run the following command:
    docker-compose -f nerdstore_production.yml up 

  NOTE: Please note that to run on docker we are looking at the appsettings.Production. And for docker, I decided to upload a db in a container, but you can change   this in the appsettings.Production by putting the command in the connection string: host.docker.internal\ \"YOUR server db"

  Example: "Server=host.docker.internal\ \MySQL;Database=NerdStore;Trusted_Connection=True;MultipleActiveResultSets=true;User Id=teste;Password=teste"

- Third, if all the steps so far were successful, I think we will be able to run the project with the certificate without any problems, just check that all the containers have uploaded without errors.

