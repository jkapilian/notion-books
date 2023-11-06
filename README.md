# Notion Books Updater
## Description
This application updates Notion Databases with metadata such as Title and Author using an inputted ISBN. The application uses the Notion and Google Books API's to fill in this information. CDK code is also included to deploy AWS infrastructure that runs this script every minute.
## Script
The script itself uses TypeScript to fetch target Notion Database, find any rows with an ISBN but no title field, find a corresponding Google Books entry, and fill in the remaining fields in the database. To run:
* Clone this repository
* Navigate to the `code` directory
* Run `npm install` to install all necessary dependencies
* Create a `.env` file in the `code` directory with the following structure:
  - `NOTION_API_KEY={notion_api_key}`
  - `DATABASE_ID={database_id}`
* Run `npm run build` to transpile into JS code or `npm start` to run the script
## CDK Infrastructure
The CDK code deploys the following infrastructure:
* A Lambda function that runs the transpiled JS code
* An EventBridge trigger that calls the Lambda once a minute
Feel free to change the timing as best suits individual needs. After setting up the AWS CLI and configuring your account's SSO (see AWS' [CDK Workshop](https://cdkworkshop.com) for more information), 
* Run `cdk bootstrap` to bootstrap the account you plan to deploy to
* Run `cdk deploy` to deploy the infrastructure to your account
## Shell Scripts
Instead of running these scripts indivudally, `build.sh` and `deploy.sh` can be used to build and deploy your application, respectively, assuming all dependencies are set up correctly.