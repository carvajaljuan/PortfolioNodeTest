# Node.js + AWS DynamoDB + HandleBars Porfolio test

This project was made using Nodejs, aws Dynamodb and express for the backend basic configuration.

The backend code is in the server folder, inside it server.js is the main script that executes the basic startup of the webapp.

Routes folder contains the endpoints info and calls the controller to get and execute the backend process,
finally the controller file calls services folder, here you can find all the database related code (get and update data).

-Endpoint to get the Portfolio data is : /getportfolio

-Endpoint to update data: /updateportfolio

To display Porfolio info, this project uses Handlebars, the views folder contains the handlebars' templates to show portfolio info and
display a menu to edit this data. the templates were based on an example made with boostrap as the initial base, which can be found in the public/example path.
however they were remade and adapted for handlebars by me.

Since handlebars uses a different syntax, the backend endpoints have been modified.
Replacing its html response with a "res.render" type to call the handelbars templates.

To get twtter timeline info Twitter's API was implemented. To connect and request this data Axios library was used,  
Created Axios functions are in the file called 'sendRedirect.js' inside server/utils and is called in the portfolio.controller file.

In total, the realization of this entire project took me around 6 and a half hours, including configuration, programming, documenting and testing.

![image](/public/assets/img/getportfolio2.JPG)
![image](/public/assets/img/updateportfolio2.JPG)

## Setup

Install nodejs

Install [AWS CLI](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.CLI.html#Tools.CLI.DownloadingAndRunning) and setup your AWS credentials, this allows to create tables and run dynamodb locally if it is needed.
For this example Dynamodb was used online using AWS.

If you want to run the db locally:
Install [dev JAR](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

This project has a json file to create the table, for this open the command window, execute the following command and replace FILEPATH woth your folder path.
In the same path you can found a json file called 'portfolio-datajson' with the data used for this example.

```
aws dynamodb create-table --cli-input-json aws dynamodb create-table --cli-input-json file://FILEPATH/PortfolioNodejs/config/tables/create-portfolio-table.json
```

Copy the project and execute 'npm i' on the console terminal.

Rename the '.env.development' file to just '.env'

Add the Bearer token of the development twitter account in the TWITTER_API variable in the .env

Add your AWS credentials in the config.js file, I left my AWS credentials in case it is necessary.

### To Run

to strat the application use the command:

```shell
npm start
```
